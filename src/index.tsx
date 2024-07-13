import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// 明示的に型アサーションを行い、nullになる可能性を除外する
const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
