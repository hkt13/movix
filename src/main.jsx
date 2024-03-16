import React from 'react'
import ReactDOM from 'react-dom/client'
import { appRouter } from './App.jsx'
import './index.scss'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
    <RouterProvider router={appRouter}/>
   </Provider>
)
