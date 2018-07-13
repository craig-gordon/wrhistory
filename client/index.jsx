import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/common/App.jsx';
import { injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
    font-family: 'Varela Round', sans-serif;
    src: url('https://fonts.googleapis.com/css?family=Varela+Round');
  }
  body {
    font-family: 'Varela Round', sans-serif;
    background: whitesmoke;
    margin: 0;
  }
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
  }
`;

window.utcOffsetMS = new Date().getTimezoneOffset() * 60 * 1000;

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);