import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import $ from 'cash-dom';
// import { AppContainer } from 'react-hot-loader';
import App from './components/common/App.jsx';

window.utcOffsetMS = new Date().getTimezoneOffset() * 60 * 1000;
const setDeviceType = () => window.deviceType = $(window).width() >= 600 ? 'lg' : 'sm';
setDeviceType();
window.onresize = setDeviceType;

const render = (Component) => {
  ReactDOM.render(
    // <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>,
    // </AppContainer>,
    document.getElementById('app')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./components/common/App.jsx', () => {
    const NextApp = require('./components/common/App.jsx').default;
    render(NextApp);
  });
}