import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserState from './state/UserState';
import ServiceState from './state/ServiceState';
import NewsState from './state/NewsState';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserState(),
    service: new ServiceState(),
    news: new NewsState()
  }}>
    <App />
  </Context.Provider> 
);
