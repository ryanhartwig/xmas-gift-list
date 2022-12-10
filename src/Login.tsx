import React, { useState } from 'react';

import './Login.css';

import { famJam } from './App';
interface LoginProps {
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>,
}


export const Login = ({setSelectedUser}: LoginProps) => {


  const [user, setUser] = useState<string>();

  return (
    <div className="login">
      <h1><span style={{fontWeight: 200}}>WHO R U?</span> <span style={{textDecoration: 'underline'}}>DON LIE</span></h1>

      <select name="person" id="person" onChange={(e) => setUser(e.target.value)}>
        <option value="">Select a user</option>
        {[...famJam, 'Anon'].map(n => <option key={n} value={n}>{n}</option>)}
      </select>

      <br></br>
      {user && <button className='login-go' onClick={() => setSelectedUser(user)}>Go ({user})</button>}
    </div>
  )
}