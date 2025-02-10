import {Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Home } from './pages/Customer/Home/Home'
import { paths } from './paths/customer'
import { Footer } from './components/Footer'
import { Navigation } from './components/Navigation'
import { SalonProfile } from './pages/Customer/Salon/Profile/SalonProfile'
import { UserProfile } from './pages/Customer/User/Profile/UserProfile'
import { DateProvider } from './context/DateContext'

function App() {

  return (
    <>
    <DateProvider>
    <Navigation />
      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.userProfile} element={<UserProfile />} />
        <Route path={paths.salonProfile} element={<SalonProfile />} />
      </Routes>
    <Footer />
    </DateProvider>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
