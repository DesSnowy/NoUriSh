import { useState } from "react"
import { useAuthContext } from './useAuthContext'

const BASE_API_URL = process.env.REACT_APP_API_URL;

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, name, residence, tele) => {
    setIsLoading(true);
    setError(null);

    const userDetails = {
        email,
        password,
        name,
        tele,
        residence,
        isAdmin: false // Default isAdmin to false
    };

    const response = await fetch(`${BASE_API_URL}/api/user/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return false;
    }
    if (response.ok) {
      //save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update auth context
      dispatch({ type: "LOGIN", payload: json});

      setIsLoading(false);
      return true;
    }
  };

  return { signup, isLoading, error };
};