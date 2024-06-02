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
        <header className='bg-white'>
            <div className="font-bold text-3xl text-blue-500">
                <Link to="/">NoUriSh</Link>
            </div>
            <nav>
                {user && (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                )}
                {!user && (
                    <div className="flex flex-row justify-end font-normal text-blue-500 space-x-2">
                        <Link to="/login">Log in</Link>
                        <Link to="/signup">Sign up</Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar