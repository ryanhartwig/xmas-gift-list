import React, { useState } from 'react';
import './Login.css';

interface LoginProps {
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>,
}

export const Login = ({setSelectedUser}: LoginProps) => {

  
  const [user, setUser] = useState<string>();

  return (
    <div className="login">
      <h1>WHO R U? DON LIE</h1>

      <select name="person" id="person" onChange={(e) => setUser(e.target.value)}>
        <option value="">Select a user</option>
        <option value="Chris">Chris</option>
        <option value="Madz">Madz</option>
        <option value="Destinee">Destinee</option>
        <option value="Andrew">Andrew</option>
        <option value="Brenda">Brenda</option>
        <option value="Frank">Frank</option>
        <option value="Kevin">Kevin</option>
        <option value="Ryan">Ryan</option>
      </select>

      <br></br>
      {user && <button className='login-go' onClick={() => setSelectedUser(user)}>Go ({user})</button>}
    </div>
  )
}