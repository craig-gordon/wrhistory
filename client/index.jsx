import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/common/App.jsx';

window.utcOffsetMS = new Date().getTimezoneOffset() * 60 * 1000;

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);