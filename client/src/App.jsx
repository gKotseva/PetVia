import {Route, Routes} from 'react-router-dom'
import { Home } from './pages/Customer/Home/Home'
import { paths } from './paths/customer'

function App() {

  return (
    <Routes>
      <Route path={paths.home} element={<Home />} />
    </Routes>
  )
}

export default App
