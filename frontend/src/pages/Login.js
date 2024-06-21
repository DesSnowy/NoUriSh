import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login, error, isLoading} = useLogin()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const success = await login(email, password)

        if (success) {
          navigate('/canteens')
        }
    }

    return (
      <form
        className="my-5 justify-center p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 w-full"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center space-y-2 sm:text-left text-xl font-bold text-black ">
          Log in
        </h3>

        <label className="userInputHeading">Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="userInput"
        />

        <label className="userInputHeading">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="userInput"
        />

        <button disabled={isLoading} className="button">
          Log in
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    );
}

export default Login