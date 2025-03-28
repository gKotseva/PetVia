import { Footer } from "./components/Footer"
import { Navigation } from "./components/Navigation"
import { Home } from "./pages/client/Home"
import { Salons } from "./pages/client/Salons"
import { paths } from "./paths"
import {Route, Routes} from 'react-router-dom'
import { UserProvider } from "./context/userContext"
import { ClientProfile } from "./pages/client/ClientProfile"
import { SalonProfile } from "./pages/salon/SalonProfile"
import { SalonSettings } from "./pages/salon/SalonSettings"

function App() {
  return (
    <>
    <UserProvider>
    <Navigation />
      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.salons} element={<Salons />} />
        <Route path={paths.clientProfile} element={<ClientProfile />} />
        <Route path={paths.salonProfile} element={<SalonProfile />} />
        <Route path={paths.salonSettings} element={<SalonSettings />} />
      </Routes>
    <Footer />
    </UserProvider>
    </>
  )
}

export default App
