//for entering user details into cart form
export default function ProfileInputs({userDetails, setUserDetails}) {
    const {name, residence, tele} = userDetails
    return (
        <>
        <label className="userInputHeading">Name: </label>
        <input
          type="text"
          onChange={(e) => setUserDetails('name', e.target.value)}
          value={name}
          className="userInput"
        />

      <label className="userInputHeading">Residence: </label>
        <select
          onChange={(e) => setUserDetails('residence', e.target.value)}
          value={residence}
          className="userInput"
        >
          <option value="">Select your residence</option>
          <option value="Tembusu">Tembusu</option>
          <option value="PGP">PGP</option>
        </select>
     

      <label className="userInputHeading">Telegram handle: </label>
      <input
          type="text"
          onChange={(e) => setUserDetails('tele', e.target.value)}
          value={tele}
          className="userInput"
        />
      </>
    )
}