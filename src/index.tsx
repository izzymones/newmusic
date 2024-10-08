import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './AppComponents/App';

// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <BrowserRouter basename={"/newmusic"}> */}
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
