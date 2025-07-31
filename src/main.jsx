import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'



const queryClient = new QueryClient();

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK); // Replace with your Stripe publishable key

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Elements stripe={stripePromise}>
            <RouterProvider router={router} />
          </Elements>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
