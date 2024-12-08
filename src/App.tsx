import { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import { Login } from './Login';
import { Item, List } from './List';
import { Buying } from './Buying';

import lights from './assets/—Pngtree—christmas light effect lamp string_6958731.png';

export const famJam = ['Chris','Ryan','Maddie','Andrew','Kevin','Brenda','Frank','Destinee'];

function App() {

  const [selectedUser, setSelectedUser] = useState<string>('');
  const [myItems, setMyItems] = useState<Map<string, Item[]>>(new Map());

  useLayoutEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setSelectedUser(user);
    }
  }, []);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('user', selectedUser);
    }
  }, [selectedUser]);

  return (
    <div className="App">
      <div className='lights-wrapper'>
        <img className='lights' draggable="false" alt="christmas lights" src={lights} />
        <img className='lights' draggable="false" alt="christmas lights" src={lights} />
        <img className='lights' draggable="false" alt="christmas lights" src={lights} />
        <img className='lights' draggable="false" alt="christmas lights" src={lights} />
        <img className='lights' draggable="false" alt="christmas lights" src={lights} />
        <img className='lights' draggable="false" alt="christmas lights" src={lights} />
      </div>
      {!selectedUser ? <Login setSelectedUser={setSelectedUser}/>
      : <>
          <h2>My list</h2>
          <List name={selectedUser} og selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

          <h4>* My purchases *</h4>
          <Buying itemsMap={myItems} />

          <h2>everyone else</h2>
          <div className='list-wrapper'>
          {famJam.map(n => {
            return (n === selectedUser) ? <div key={n}></div> : <List setMyItems={setMyItems} name={n} selectedUser={selectedUser} key={n} />;
          })}
          </div>
        </>}
    </div>
  );
}

export default App;
