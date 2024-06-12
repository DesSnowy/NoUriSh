import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const ProfileForm = () => {
  const { user } = useAuthContext();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [residence, setResidence] = useState("");
  const [tele, setTele] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`${BASE_API_URL}api/user/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json(); //array of profile objects

      if (response.ok) {
        setName(json.name);
        setResidence(json.residence);
        setTele(json.tele);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    setIsEditing(false);

    const newProfile = { name, residence, tele };

    //fetch request to patch with updated data
    const response = await fetch(`${BASE_API_URL}api/user/`, {
      method: "PATCH",
      body: JSON.stringify(newProfile),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setIsEditing(true);
    }
    if (response.ok) {
      setName(json.name);
      setResidence(json.residence);
      setTele(json.tele);
      setError(null);
    }
  };

  return (
    <form
      className="m-5 p-6 max-w-sm bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 w-full justify-end"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center space-y-2 sm:text-left text-xl font-bold text-black">
        My Profile
      </h3>

      <label className="userInputHeading">Name: </label>
      {isEditing ? (
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="userInput"
        />
      ) : (
        <b>{name}</b> //get the name from api
      )}

      <label className="userInputHeading">Residence: </label>
      {isEditing ? (
        <select
          onChange={(e) => setResidence(e.target.value)}
          value={residence}
          className="userInput"
        >
          <option value="">Select your residence</option>
          <option value="Tembusu">Tembusu</option>
          <option value="PGP">PGP</option>
        </select>
      ) : (
        <b>{residence}</b> //get the name from api
      )}

      <label className="userInputHeading">Telegram handle: </label>
      {isEditing ? (
        <input
          type="text"
          onChange={(e) => setTele(e.target.value)}
          value={tele}
          className="userInput"
        />
      ) : (
        <b>{tele}</b> //get the name from api
      )}

      <button className="button">{isEditing ? "Save" : "Edit"} Profile</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProfileForm;
