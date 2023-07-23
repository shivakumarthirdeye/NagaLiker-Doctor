import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import store from './redux/app/store';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}>
    <ToastContainer position="top-center"/>
      <App />
    </Provider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </React.StrictMode>
);
