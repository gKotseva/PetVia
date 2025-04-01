import { Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Navigation } from "./components/Navigation"
import { AuthProvider } from "./context/AuthContext"
import { NotificationProvider } from "./context/NotificationContext"
import { SalonSettings } from "./pages/salon/SalonSettings"
import { paths } from "./paths"
import { ClientProfile } from "./pages/customer/ClientProfile"

function App() {
  return (
    <>
    <NotificationProvider>
    <AuthProvider>
    <Navigation />
    <Routes>
        <Route path={paths.salonSettings} element={<SalonSettings />} />
        <Route path={paths.clientProfile} element={<ClientProfile />} />
        {/* <Route path={paths.test} element={<Test />} /> */}
      </Routes>
    <Footer />
    </AuthProvider>
    </NotificationProvider>
    </>
  )
}

export default App
