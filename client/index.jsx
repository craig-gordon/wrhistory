import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import { injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
    font-family: 'Varela Round', sans-serif;
    src: url('https://fonts.googleapis.com/css?family=Varela+Round');
  }
  body {
    font-family: 'Varela Round', sans-serif;
    margin: 0 8%;
    background: whitesmoke;
  }
`;

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);