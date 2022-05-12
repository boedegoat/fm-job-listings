import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { StateMachineProvider, createStore } from 'little-state-machine'

createStore(
    {
        filter: [],
    },
    {
        persist: import.meta.env.DEV ? 'none' : 'onAction',
    }
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StateMachineProvider>
            <App />
        </StateMachineProvider>
    </React.StrictMode>
)
