import { useState } from 'react';
import './App.css';
import { Login } from './Login';
import { List } from './List';

function App() {


  const [selectedUser, setSelectedUser] = useState<string>('');
  

  
  
  return (
    <div className="App">
      {!selectedUser ? <Login setSelectedUser={setSelectedUser}/>
      : <>

        <h2>My list</h2>
        <List name={selectedUser} og selectedUser={selectedUser} />

        <h2>everyone else</h2>

        <div className='list-wrapper'>
        {['Chris','Ryan','Madz','Andrew','Kevin','Brenda','Frank','Destinee'].map(n => {
          return (n === selectedUser) ? <></> : <List name={n} selectedUser={selectedUser} />;
        })}
      </div>
      </>}
    </div>
  );
}

export default App;
