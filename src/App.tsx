import { useEffect, useState } from 'react';
import './App.css';
import { Login } from './Login';
import { Item, List } from './List';
import { Buying } from './Buying';

export const famJam = ['Chris','Ryan','Maddie','Andrew','Kevin','Brenda','Frank','Destinee'];

function App() {


  const [selectedUser, setSelectedUser] = useState<string>('');

  const [myItems, setMyItems] = useState<Map<string, Item[]>>(new Map())

  useEffect(() => { console.log(myItems)}, [myItems])
  
  return (
    <div className="App">
      {!selectedUser ? <Login setSelectedUser={setSelectedUser}/>
      : <>
          <h2>My list</h2>
          <List name={selectedUser} og selectedUser={selectedUser} />

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
