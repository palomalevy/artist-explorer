import React from 'react';
import { StrictMode } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './contexts/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
  </BrowserRouter>
)
