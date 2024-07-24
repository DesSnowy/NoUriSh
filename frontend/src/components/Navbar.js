import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from 'react';

const BASE_API_URL = process.env.REACT_APP_API_URL;

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const location = useLocation()
    const [isAdmin, setIsAdmin] = useState(false)

    const handleClick = () => {
        logout()
        window.location.href = '/';
    }

    useEffect(() => {
      const fetchProfile = async () => {
        const response = await fetch(`${BASE_API_URL}/api/user/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json(); //array of profile objects
  
        if (response.ok) {
          setIsAdmin(json.isAdmin);
        }

        if (!response.ok && json.error == "Request is not authorised") {
          logout();
          window.location.href = "/";
        }
      };
  
      if (user) {
        fetchProfile();
      }
    }, [user]);

    return (
      <header className="bg-white flex flex-row justify-between items-center h-20">
        <div className="font-bold text-4xl text-blue-500 pl-5 hover:text-blue-700">
          <Link to="/">NoUriSh</Link> 
        </div>
        <nav className='flex-grow'>
        {user && (
          <div className="flex justify-between items-center w-full px-5">
            <div className="flex flex-grow justify-center">
              <div className="flex flex-row justify-center items-center font-medium text-gray-500 hover:text-black space-x-20 text-xl m-3">
                  <NavLinkWithUnderline to="/" currentPath={location.pathname}>Home</NavLinkWithUnderline>
                  <NavLinkWithUnderline to="/canteens" currentPath={location.pathname}>Order</NavLinkWithUnderline>
                  <NavLinkWithUnderline to="/cart" currentPath={location.pathname}>Cart</NavLinkWithUnderline>
                  <NavLinkWithUnderline to="/grouporder" currentPath={location.pathname}>Group Order</NavLinkWithUnderline>
                  <NavLinkWithUnderline to="/myorders" currentPath={location.pathname}>My Orders</NavLinkWithUnderline>
                  <NavLinkWithUnderline to="/profile" currentPath={location.pathname}>Profile</NavLinkWithUnderline>
                  {isAdmin && <NavLinkWithUnderline to="/admin" currentPath={location.pathname}>Admin</NavLinkWithUnderline>}
              </div>
            </div>
            <div className="flex flex-row items-center font-normal text-lg m-3 space-x-4">
              <span className="text-blue-500">{user.email}</span>
              <button className="bg-red-200 px-3 rounded-full hover:bg-red-300" onClick={handleClick}>
                Log out
              </button>
            </div>
          </div>
          )}

          {!user && (
            <div className="flex flex-row justify-end font-normal text-blue-500 space-x-2 text-lg m-3 pr-5">
              <Link
                to="/login"
                className="bg-green-300 rounded-full px-3 hover:bg-green-500 hover:text-white"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-green-300 rounded-full px-3 hover:bg-green-500 hover:text-white"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </header>
    );
}

const NavLinkWithUnderline = ({ to, currentPath, children }) => {
  const isActive = currentPath === to;
  return (
      <Link to={to} className={`font-medium text-gray-500 hover:text-black ${isActive ? 'underline' : ''}`}>
          {children}
      </Link>
  );
};

export default Navbar