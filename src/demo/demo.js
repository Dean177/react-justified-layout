require('./demo.css');
const brokenKitten = require('./images/broken-kitten-641x855.jpg');
const coffeeCup = require('./images/coffee-cup-675x440.jpg');
const halfDome1 = require('./images/half-dome-1-5772x1413.jpg');
const halfDome2 = require('./images/half-dome-2-1600x1200.jpg');
const harvest = require('./images/harvest-665x439.jpg');
const howl = require('./images/howl-458x440.jpg');
const meanBerd = require('./images/mean-berd-500x708.jpg');
const nightLake = require('./images/night-lake-3440x1440.jpg');
const pizza = require('./images/pizza-588x440.jpg');
const snowboarder = require('./images/snowboarder-351x440.jpg');
const theEnd = require('./images/the-end-291x440.jpg');
const wonderful = require('./images/wonderful-330x440.jpg');
const youngPlant = require('./images/young-plant-366x439.jpg');

const JustifiedLayout = require('../react-justified-layout');
const React = require('react');

class Demo extends React.Component {
  render() {
    const containerStyle = {
      backgroundColor: '#AD89BA'
    };
    const childElements = [
      <img key='bk' src={brokenKitten} style={{ height: 855, width: 641 }}/>,
      <img key='cc' src={coffeeCup} style={{ height: 440, width: 675 }}/>,
      <div key='acc' style={{ height: 300, width: 300, backgroundColor: '#58FA23' }}/>,
      <img key='sb' src={snowboarder} style={{ height: 440, width: 351 }}/>,
      <img key='yp' src={youngPlant} style={{ height: 439, width: 366 }}/>,
      <img key='te' src={theEnd} style={{ height: 440, width: 291 }}/>,
      <img key='hd1' src={halfDome1} style={{ height: 1413, width: 3772 }}/>,
      <div key='acb' style={{ height: 150, width: 220, backgroundColor: '#123654' }}/>,
      <img key='hv' src={harvest} style={{ height: 439, width: 665 }}/>,
      <img key='hl' src={howl} style={{ height: 440, width: 458 }}/>,
      <img key='pz' src={pizza} style={{ height: 440, width: 530 }}/>,
      <div key='aca' style={{ height: 350, width: 250, backgroundColor: '#FA8723', padding: 10, wordWrap: 'break-word' }}>
        Any old component
      </div>,
      <img key='mb' src={meanBerd} style={{ height: 708, width: 500 }}/>,
      <img key='nl' src={nightLake} style={{ height: 1440, width: 3440 }}/>,
      <img key='hd2' src={halfDome2} style={{ height: 1200, width: 1600 }}/>,
      <img key='wf' src={wonderful} style={{ height: 440, width: 350 }}/>
    ];

    return (
      <div className='demo'>
        <h1>react-justified-layout</h1>
        <p>Flickr's <a href='http://flickr.github.io/justified-layout/'>Justified-Layout</a> as React component</p>
        <h2>Installation</h2>
        <pre><code>npm install react-justified-layout</code></pre>

        <h2>Usage</h2>
        <p>
          Every element contained within <code>{'<JustifiedLayout>'}</code> must have either
          height and width 'style' props, or have an 'aspectRatio' prop. If the 'aspectRatio'
          prop is present, it will be removed before rendering. This prop can be preserved
          by setting the 'preserveAspectRatioTag' prop to true.
        </p>
        <pre>
          <code>{`
const React = require('react');
const JustifiedLayout = require('react-justified-layout');

class SomeComponent extends React.Component {
  render() {
    return (
      <JustifiedLayout ...config>
          <img style={{ height: 1920, width: 1080 }} src='path/to/image.png' />
          <div aspectRatio={1.8}>Some Div</div>
          <CustomComponent style={{ height: 300, width: 400 }} />
          ...
      </JustifiedLayout>
    );
  }
}
`}</code>
        </pre>

        <h2>Config</h2>
        <p>For a full list of available options see <a href='http://flickr.github.io/justified-layout/'>http://flickr.github.io/justified-layout/</a></p>

        <h2>Default</h2>
        <JustifiedLayout containerWidth={530} style={containerStyle} targetRowHeight={160}>
          {childElements}
        </JustifiedLayout>

        <h2>Container Padding</h2>
        <pre>
          <code>
            {'<JustifiedLayout containerPadding={50}>'}
          </code>
        </pre>
        <JustifiedLayout containerPadding={50}
                         containerWidth={530}
                         targetRowHeight={160}
                         style={containerStyle}>
          {childElements}
        </JustifiedLayout>

        <h2>Uneven Container Padding Config</h2>
        <pre>
          <code>
            {'<JustifiedLayout containerPadding={{ top: 50, right: 20, left: 120, bottom: 50 }}>'}
          </code>
        </pre>
        <JustifiedLayout containerPadding={{ top: 50, right: 20, left: 120, bottom: 50 }}
                         containerWidth={530}
                         targetRowHeight={160}
                         style={containerStyle}>
          {childElements}
        </JustifiedLayout>

        <h2>Target Row Height</h2>
        <pre>
          <code>
            {'<JustifiedLayout targetRowHeight={100}>'}
          </code>
        </pre>
        <JustifiedLayout targetRowHeight={100}
                         containerWidth={530}
                         style={containerStyle}>
          {childElements}
        </JustifiedLayout>

        <h2>Force Aspect Ratio</h2>
        <pre>
          <code>
            {'<JustifiedLayout forceAspectRatio={1}>'}
          </code>
        </pre>
        <JustifiedLayout targetRowHeight={160}
                         containerWidth={530}
                         forceAspectRatio={1}
                         style={containerStyle}>
          {childElements}
        </JustifiedLayout>

        <h2>Widows Config</h2>
        <p>
          A boolean which controls whether children which cant fill the remaining space of the last
          row should be displayed or not. Compare this output to the 'default' example to see whats
          different
        </p>
        <pre>
          <code>
            {'<JustifiedLayout showWidows={false}>'}
          </code>
        </pre>
        <JustifiedLayout targetRowHeight={160}
                         containerWidth={530}
                         showWidows={false}
                         style={containerStyle}>
          {childElements}
        </JustifiedLayout>

        <h2>Full Width Breakout Row</h2>
        <pre>
          <code>
            {'<JustifiedLayout fullWidthBreakoutRowCadence={2}>'}
          </code>
        </pre>
        <JustifiedLayout targetRowHeight={160}
                         containerWidth={530}
                         fullWidthBreakoutRowCadence={2}
                         style={containerStyle}>
          {childElements}
        </JustifiedLayout>
      </div>
    );
  }
}

module.exports = Demo;
