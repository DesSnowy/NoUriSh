import { Link, useActionData } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
      <header className="bg-white flex flex-row justify-between items-center">
        <div className="font-bold text-3xl text-blue-500 pl-5 hover:text-blue-700">
          <Link to="/">NoUriSh</Link> 
        </div>
        <nav>
          {user && (
            <div className="flex flex-row justify-end font-normal space-x-4 text-lg m-3 pr-5">
              <span className="pr-10">{user.email}</span>
              <button
                className="bg-red-200 px-3 rounded-full hover:bg-red-400"
                onClick={handleClick}
              >
                Log out
              </button>

              <Link
                to="/"
                className="font-medium text-gray-500 hover:text-black">
                Home
              </Link>

              <Link
                to="/canteens"
                className="font-medium text-gray-500 hover:text-black">
                Order
              </Link>

              <Link
                to="/cart"
                className="font-medium text-gray-500 hover:text-black">
                Cart
              </Link>

              <Link
                to="/grouporder"
                className="font-medium text-gray-500 hover:text-black">
                Group Order
              </Link>

              <Link
                to="/myorders"
                className="font-medium text-gray-500 hover:text-black">
                My Orders
              </Link>

              <Link
                to="/profile"
                className="font-medium text-gray-500 hover:text-black">
                Profile
              </Link>
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

export default Navbar