import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CoinsDataProvider } from './context/CoinsDataProvider.jsx'

createRoot(document.getElementById('root')).render(
    <CoinsDataProvider>
        <App />
    </CoinsDataProvider>
)
