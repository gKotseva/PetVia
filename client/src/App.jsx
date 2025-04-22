import { Navigate, Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Navigation } from "./components/Navigation"
import { useAuth } from "./context/AuthContext"
import { NotificationProvider } from "./context/NotificationContext"
import { SalonSettings } from "./pages/salon/SalonSettings"
import { paths } from "./paths"
import { ClientProfile } from "./pages/customer/ClientProfile"
import { Home } from "./pages/shared/Home"
import { Salons } from "./pages/shared/Salons"
import { SalonProfile } from "./pages/shared/SalonProfile"
import { NotFound } from "./pages/shared/NotFound"

function App() {
  const { auth } = useAuth()

  return (
    <>
        <Navigation />
        <Routes>
          <Route
            path={paths.salonSettings}
            element={
              auth === null ? null : auth?.role === "salon"
              ? <SalonSettings />
              : <Navigate to="/" replace />
            }
          />
          <Route
            path={paths.clientProfile}
            element={
              auth === null ? null : auth?.role === "user"
                ? <ClientProfile />
                : <Navigate to="/" replace />
            }
          />
          <Route path={paths.salons} element={<Salons />} />
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.salonProfile} element={<SalonProfile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
