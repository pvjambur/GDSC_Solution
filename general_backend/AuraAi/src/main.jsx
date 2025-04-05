import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/UserLogin.jsx'
import UserContext from './context/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContext from './context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminContext>
    <UserContext>
    <BrowserRouter>
    <App />
   
    </BrowserRouter>
    </UserContext>
    </AdminContext>
  </StrictMode>,
)
