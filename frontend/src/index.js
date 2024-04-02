import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from "react-router-dom";

// Create a root element for rendering the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside BrowserRouter and SnackbarProvider
root.render(
  <BrowserRouter>
    {/* SnackbarProvider to display snackbars for notifications */}
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </BrowserRouter>
);
