import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "./api/config";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App></App>
  </StrictMode>,
)
