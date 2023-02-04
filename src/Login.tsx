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
      <h1>{w.map((c, i) => <span key={`${c}-${i}`} style={{color: i % 2 === 0 ? 'red' : 'green'}}>{c}</span>)}</h1>
      <div style={{position: 'relative'}}>
        <p>Now with <span style={{fontSize: '32px'}}>REAL-TIME</span> updates!11!!1</p>
        <img className='wow' referrerPolicy='no-referrer' src="https://static.wikia.nocookie.net/jerma-lore/images/7/78/BIG_WOW.png/revision/latest?cb=20200903171222" alt='thing'></img>
      </div>

      <h2><span style={{fontWeight: 200}}>WHO R U?</span> <span style={{textDecoration: 'underline'}}>DON LIE</span></h2>

      <select name="person" id="person" onChange={(e) => setUser(e.target.value)}>
        <option value="">Select a user</option>
        {famJam.map(n => <option key={n} value={n}>{n}</option>)}
      </select>

      <br></br>
      {user && <button className='login-go' onClick={() => setSelectedUser(user)}>Go ({user})</button>}

      <p>All writing operations have been revoked</p>
    </div>
  )
}