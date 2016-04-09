const isNumber = require('lodash/isNumber');
const justifiedLayout = require('justified-layout');
const map = require('lodash/map');
const React = require('react');
const take = require('lodash/take');
const zip = require('lodash/zip');

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
  boxSpacing: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.shape({
      horizontal: React.PropTypes.number.isRequired,
      vertical: React.PropTypes.number.isRequired,
    })
  ]),
  children: React.PropTypes.node,
  containerPadding: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.shape({
      bottom: React.PropTypes.number.isRequired,
      left: React.PropTypes.number.isRequired,
      right: React.PropTypes.number.isRequired,
      top: React.PropTypes.number.isRequired
    })
  ]),
  containerWidth: React.PropTypes.number,
  forceAspectRation: React.PropTypes.oneOfType([React.PropTypes.boolean, React.PropTypes.number]),
  fullWidthBreakoutRowCadence: React.PropTypes.oneOfType([
    React.PropTypes.boolean,
    React.PropTypes.number
  ]),
  maxNumRows: React.PropTypes.number,
  showWidows: React.PropTypes.bool,
  targetRowHeight: React.PropTypes.number,
  targetRowHeightTolerance: React.PropTypes.number
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
  targetRowHeightTolerance: 0.25
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