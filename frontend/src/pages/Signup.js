import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <form className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 w-full" onSubmit={handleSubmit}>
            <h3 className="text-center space-y-2 sm:text-left text-xl font-bold text-black">Sign up</h3>

            <label className='userInputHeading'>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="userInput"
            />

            <label className='userInputHeading'>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="userInput"
            />

            <button disabled={isLoading} className="button">Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup