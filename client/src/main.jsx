import './index.css'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <NotificationProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </NotificationProvider>
    </BrowserRouter>
)