/* eslint-disable linebreak-style */
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './components/NotificationContext'
import { Provider } from 'react-redux'
import store from './store'

const queryClient=new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient} >
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>

    </QueryClientProvider>
  </Provider>



)