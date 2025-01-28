import {Route, Routes} from 'react-router-dom'
import { Home } from './pages/Customer/User/Home/Home'
import { paths } from './paths/customer'
import { Footer } from './components/Footer'
import { Navigation } from './components/Navigation'
import { Profile } from './pages/Customer/User/Profile/Profile'

function App() {

  return (
    <>
    <Navigation />
      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.profile} element={<Profile />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
