const isNumber = require('lodash/isNumber');
const map = require('lodash/map');
const take = require('lodash/take');
const zip = require('lodash/zip');
const justifiedLayout = require('justified-layout');
const PropTypes = require('prop-types');
const React = require('react');

function extractDimension({ props }) {
  if (!props) {
    // TODO
    return 0;
  }

  if (props.aspectRatio) {
    return props.aspectRatio;
  } else {
    return { height: props.style.height, width: props.style.width };
  }
  // TODO Measure the element if no props are here?
}

function normalizeDimension(dimension) {
  if (isNumber(dimension)) {
    return dimension;
  } else if (dimension.height && dimension.width) {
    return dimension.width / dimension.height;
  } else {
    return 0;
  }
}

const Style = { position: 'relative' };

const JustPropTypes = {
  boxSpacing: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      horizontal: PropTypes.number.isRequired,
      vertical: PropTypes.number.isRequired
    })
  ]),
  children: PropTypes.node,
  containerPadding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      bottom: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      right: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired
    })
  ]),
  containerWidth: PropTypes.number,
  forceAspectRation: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  fullWidthBreakoutRowCadence: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  maxNumRows: PropTypes.number,
  showWidows: PropTypes.bool,
  targetRowHeight: PropTypes.number,
  targetRowHeightTolerance: PropTypes.number,
  widowLayoutStyle: PropTypes.string
};

const JustDefaultProps = {
  boxSpacing: 10,
  containerPadding: 10,
  containerWidth: 1060,
  forceAspectRation: false,
  fullWidthBreakoutRowCadence: false,
  maxNumRows: Number.POSITIVE_INFINITY,
  showWidows: true,
  targetRowHeight: 320,
  targetRowHeightTolerance: 0.25,
  widowLayoutStyle: 'left'
};

class JustifiedLayout extends React.Component {
  // See http://flickr.github.io/justified-layout/ for an explanation of what these props do
  static propTypes: JustPropTypes;
  static defaultProps: JustDefaultProps;

  render() {
    const { children, style, ...config } = this.props;
    const childDims = React.Children
      .map(children, extractDimension)
      .map(normalizeDimension);

    const { containerHeight, boxes } = justifiedLayout(childDims, config);
    const elementLayout = zip(take(children, boxes.length), boxes);

    return (
      <div style={{ ...Style, ...style, height: containerHeight, width: this.props.containerWidth }}>
        {map(elementLayout, ([element, layout]) => {
          const { height, left, top, width } = layout;
          return React.cloneElement(element, {
            ...element.props,
            style: {
              ...element.props.style,
              position: 'absolute',
              height, left, top, width
            }
          });
        })}
      </div>
    );
  }
}

module.exports = JustifiedLayout;