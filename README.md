# react-justified-layout
Flickr's justified layout as a React component

## Usage
See [here](http://dean177.github.io/react-justified-layout/) for documentation & demo.
```javascript
const JustifiedLayout = require('react-justified-layout');

<JustifiedLayout ...opts>
    <img style={{ height:1920, width: 1080 }} src="" />
    <div aspectRatio={1.8}>Some Div</div>
    <CustomComponent style={}
</JustifiedLayout>
```

## Development
```bash
npm install
npm start
open http://localhost:3000
npm lint
npm test
```