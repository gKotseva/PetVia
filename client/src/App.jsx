import { Navigate, Route, Routes } from "react-router-dom"

import { paths } from "./paths"
import { Footer } from "./components/Footer"
import { Navigation } from "./components/Navigation"
import { Home } from "./pages/shared/Home";
import { Salons } from "./pages/shared/Salons";
import { SalonProfile } from "./pages/shared/SalonProfile";
import { NotFound } from "./pages/shared/NotFound";
import { useAuth } from "./context/AuthContext";
import { ClientProfile } from "./pages/customer/ClientProfile";
import { SalonSettings } from "./pages/salon/SalonSettings"

function App() {
  const { auth } = useAuth();

  return (
    <div className="page-wrapper">
      <Navigation />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}

export default App
