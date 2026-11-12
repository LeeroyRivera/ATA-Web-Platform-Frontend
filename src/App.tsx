import { BrowserRouter, Route, Routes } from 'react-router'
import AppLayout from './app/AppLayout.tsx'
import { SessionProvider } from './app/session.tsx'
import { ToastProvider } from './components/toast/ToastProvider.tsx'
import LoginPage from './features/auth/LoginPage.tsx'
import HomePage from './features/home/HomePage.tsx'
import GrInvoicePage from './features/gr-invoice/GrInvoicePage.tsx'
import NotFoundPage from './features/not-found/NotFoundPage.tsx'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ToastProvider>
        <SessionProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="gr-invoice" element={<GrInvoicePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </SessionProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
