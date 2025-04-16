import { Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Navigation } from "./components/Navigation"
import { AuthProvider } from "./context/AuthContext"
import { NotificationProvider } from "./context/NotificationContext"
import { SalonSettings } from "./pages/salon/SalonSettings"
import { paths } from "./paths"
import { ClientProfile } from "./pages/customer/ClientProfile"
import { Home } from "./pages/shared/Home"
import { Salons } from "./pages/shared/Salons"
import { SalonProfile } from "./pages/shared/SalonProfile"

function App() {
  return (
    <>
    <NotificationProvider>
    <AuthProvider>
    <Navigation />
    <Routes>
        <Route path={paths.salonSettings} element={<SalonSettings />} />
        <Route path={paths.clientProfile} element={<ClientProfile />} />
        <Route path={paths.salons} element={<Salons />} />
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.salonProfile} element={<SalonProfile />} />
      </Routes>
    <Footer />
    </AuthProvider>
    </NotificationProvider>
    </>
  )
}

export default App
