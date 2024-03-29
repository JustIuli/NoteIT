import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Index from "./pages/Index.tsx";
import Error from "./pages/Error.tsx";
import SignIn from "./pages/Authentification/SignIn.tsx";
import SignUp from "./pages/Authentification/SignUp.tsx";
import Notes from "./pages/Note.tsx";
import './index.css'
import Guard from "./utils/AuthGuard.tsx";
import ForgotPassword from "./pages/Authentification/ForgotPassword.tsx";
import ThemeProvider from "./components/Layouts/ThemeProvider.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
        errorElement: <Error />
    },
    {
        path: "/auth/sign-in",
        element: <SignIn />,
        errorElement: <Error />
    },
    {
        path: "/auth/sign-up",
        element: <SignUp />,
        errorElement: <Error />
    },
    {
        path:"/app/:section",
        element:<Guard><Notes/></Guard>,
        errorElement:<Error />
    },
    {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
        errorElement: <Error />
    }
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
          <ThemeProvider>
                  <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                  </QueryClientProvider>
          </ThemeProvider>
  </React.StrictMode>,
)
