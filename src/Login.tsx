import React from 'react';

import './Login.css';

import { famJam } from './App';
interface LoginProps {
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}

const w = ['W', 'i', 's', 'h', 'l', 'i', 's', 't', '!'];

export const Login = ({ setSelectedUser }: LoginProps) => {
  return (
    <div className='login'>
      <h1>
        {w.map((c, i) => (
          <span
            key={`${c}-${i}`}
            style={{ color: i % 2 === 0 ? 'red' : 'green', fontWeight: 300 }}
          >
            {c}
          </span>
        ))}
      </h1>
      <div style={{ position: 'relative' }}></div>

      <h2>
        <span style={{ fontWeight: 200 }}>Who are you?</span>
      </h2>

      <div className='fam-list'>
        {famJam
          .sort((a, b) => a.localeCompare(b))
          .map(n => {
            return (
              <button className='login-go' onClick={() => setSelectedUser(n)}>
                {n}
              </button>
            );
          })}
      </div>
    </div>
  );
};
