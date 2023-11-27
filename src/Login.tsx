import React, { useState } from 'react';

import './Login.css';

import { famJam } from './App';
interface LoginProps {
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>,
}

const w = ['W','i','s','h','l','i','s','t','!'];

export const Login = ({setSelectedUser}: LoginProps) => {

  const [user, setUser] = useState<string>();

  return (
    <div className="login">
      <h1>{w.map((c, i) => <span key={`${c}-${i}`} style={{color: i % 2 === 0 ? 'red' : 'green', fontWeight: 300}}>{c}</span>)}</h1>
      <div style={{position: 'relative'}}>
      </div>

      <h2><span style={{fontWeight: 200}}>Select your name:</span></h2>

      <select name="person" id="person" onChange={(e) => setUser(e.target.value)}>
        <option value="">Select a user</option>
        {famJam.map(n => <option key={n} value={n}>{n}</option>)}
      </select>

      <br></br>
      {user && <button className='login-go' onClick={() => setSelectedUser(user)}>Go ({user})</button>}
    </div>
  )
}
