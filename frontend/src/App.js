import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import MyOrders from './pages/MyOrders'
import Cart from './pages/Cart'
import Canteens from './pages/Canteens'
import Stalls from './pages/Stalls'
import Menu from "./pages/Menu";

function App() {
  const { user } = useAuthContext()

  return (
    <div className="h-screen bg-blue-100">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="/canteens" element={<Canteens />} />
            <Route path="/canteens/:canteenId/stalls" element={<Stalls />} />
            <Route
              path="/canteens/:canteenId/stalls/:stallId/menu"
              element={<Menu />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myorders" element={<MyOrders />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
