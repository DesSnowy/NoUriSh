import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [residence, setResidence] = useState("")
    const [tele, setTele] = useState("")
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
      <form
        className="my-5 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 w-full"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center space-y-2 sm:text-left text-xl font-bold text-black">
          Sign up
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

        <label className="userInputHeading">Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="userInput"
        />

        <label className="userInputHeading">Residence:</label>
        <select
          onChange={(e) => setResidence(e.target.value)}
          value={residence}
          className="userInput"
        >
          <option value="">Select your residence</option>
          <option value="Tembusu">Tembusu</option>
          <option value="PGP">PGP</option>
        </select>

        <label className="userInputHeading">Telegram Handle:</label>
        <input
          type="text"
          onChange={(e) => setTele(e.target.value)}
          value={tele}
          className="userInput"
        />

        <button disabled={isLoading} className="button">
          Sign up
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    );
}

export default Signup