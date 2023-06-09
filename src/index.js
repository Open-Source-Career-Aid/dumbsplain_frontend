import React from 'react';
// import ReactDOM from 'react-dom/client';
import { hydrate , render } from "react-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

const rootElement = document.getElementById('root');
// just use hydrate everywhere
if (rootElement.hasChildNodes()) {
  hydrate(<BrowserRouter><App /></BrowserRouter>, rootElement);
} else {
  render(<BrowserRouter><App /></BrowserRouter>, rootElement);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
