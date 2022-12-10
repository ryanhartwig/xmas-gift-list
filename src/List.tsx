import { useCallback, useEffect, useState } from 'react';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import './List.css';
import { app } from './fb';
import { ListItem } from './ListItem';
import uuid from 'react-uuid';

interface ListProps {
  name: string,
  og?: boolean,
  selectedUser: string,
}

export interface Doc { 
  [key: string]: Item
}

export interface Item {
  item: string,
  id: string,
  buyer: string,
  belongsto: string,
}

export const List = ({name, og = false, selectedUser}: ListProps) => {

  const [input, setInput] = useState<string>('');
  const [data, setData] = useState<Item[]>([]);

  const db = getFirestore(app);

  const getList = useCallback(() => {
    const getData = async () => {
      const docRef = doc(db, 'users', name);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as {items: Item[]};
        console.log(data);
        setData([...data.items as Item[]])
      }
    }

    getData();
  }, [db, name]);


  useEffect(() => {
    getList();
  }, [db, getList, name]);


  const onAdd = useCallback((e: any) => {
    e.preventDefault();

    const items = [...data, {
      item: input,
      id: uuid(),
      buyer: '',
      belongsto: name,
    }]

    const userRef = doc(db, 'users', name);
    setDoc(userRef, { items: items});

    getList();
    
    setInput('');
  }, [data, db, getList, input, name])



  
  return (
    <div className={`list ${og ? 'og' : ''}`}>
      <h4>{name}</h4>

      {og && <form onSubmit={onAdd}>
        <input placeholder='type wot u want' value={input} onChange={(e) => setInput(e.target.value)} required></input>
        <input type="submit" value={'Add (enter)'}></input>
      </form>}

      <div className='list-items'>
        {data.map(i => {
        return <ListItem item={i} og={og} selectedUser={selectedUser} key={i.id} 
          data={data} getList={getList}/>
        })}
      </div>
      
    </div>
  )
  
}