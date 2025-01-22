import {Route, Routes} from 'react-router-dom'
import { Home } from './pages/Customer/Home/Home'
import { paths } from './paths/customer'
import { Footer } from './components/Footer'
import { Navigation } from './components/Navigation'

function App() {

  return (
    <>
    <Navigation />
      <Routes>
        <Route path={paths.home} element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
