import {Route, Routes} from 'react-router-dom'
import { Home } from './pages/Customer/Home/Home'
import { paths } from './paths/customer'
import { Footer } from './components/Footer'

function App() {

  return (
    <>
      <Routes>
        <Route path={paths.home} element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
