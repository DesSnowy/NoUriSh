import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const Header = () => {
    const navigate = useNavigate()
    const { user } = useAuthContext();

    const handleButtonClick = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate("/ordering");
        }
    };

    return (
        <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/header-background.webp')" }}>
            <div className="h-screen flex items-center">
                <div className="text-center mx-auto">
                    <h1 className="text-6xl font-semibold">Welcome to NoUriSh</h1>
                    <p className="text-3xl font-light mt-5">Get your food at your convenience!</p>
                    <button onClick={handleButtonClick} className="bg-blue-500 text-white px-6 py-3 mt-5 rounded-md hover:bg-blue-700 transition duration-300">
                        Join a group order
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
