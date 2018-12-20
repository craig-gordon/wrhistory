import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { AppContainer } from 'react-hot-loader';
import App from './components/common/App.jsx';

window.utcOffsetMS = new Date().getTimezoneOffset() * 60 * 1000;

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