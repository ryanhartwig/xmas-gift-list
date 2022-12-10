import { useState } from 'react';
import './App.css';
import { Login } from './Login';
import { List } from './List';

export const famJam = ['Chris','Ryan','Maddie','Andrew','Kevin','Brenda','Frank','Destinee'];

function App() {


  const [selectedUser, setSelectedUser] = useState<string>('');
  

  
  
  return (
    <div className="App">
      {!selectedUser ? <Login setSelectedUser={setSelectedUser}/>
      : <>

        {selectedUser !== 'Anon' && <>
          <h2>My list</h2>
          <List name={selectedUser} og selectedUser={selectedUser} />

          <h2>everyone else</h2>
          </>}
        

        <div className='list-wrapper'>
        {famJam.map(n => {
          return (n === selectedUser) ? <div key={n}></div> : <List name={n} selectedUser={selectedUser} key={n} />;
        })}
      </div>
      </>}
    </div>
  );
}

export default App;
