import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { AppContainer } from 'react-hot-loader';
import App from './components/common/App.jsx';
import WidthProvider from './components/common/WidthProvider.jsx';
import { setUtcOffsetMS } from './utils/datetimeUtils.js';
import { setWidthType } from './utils/resolutionUtils.js';

setUtcOffsetMS();
setWidthType();
window.onresize = setWidthType;

const render = Component => {
  ReactDOM.render(
    // <AppContainer>
    <BrowserRouter>
      <WidthProvider>
        <Component />
      </WidthProvider>
    </BrowserRouter>,
    // </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/common/App.jsx', () => {
    const NextApp = require('./components/common/App.jsx').default;
    render(NextApp);
  });
}
