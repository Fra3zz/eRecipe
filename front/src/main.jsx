import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Add this import
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap the entire App in BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
