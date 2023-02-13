import { useCallback, useEffect, useState } from 'react';
import { doc, getDoc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import './List.css';
import { app } from './fb';
import { ListItem } from './ListItem';
import uuid from 'react-uuid';


export interface Doc { 
  [key: string]: Item
}

export interface Item {
  item: string,
  id: string,
  buyer: string,
  belongsto: string,
  anonymous: boolean,
}

interface ListProps {
  name: string,
  og?: boolean,
  selectedUser: string,
  setMyItems?: React.Dispatch<React.SetStateAction<Map<string, Item[]>>>,
}

export const List = ({name, setMyItems, og = false, selectedUser}: ListProps) => {

  const [input, setInput] = useState<string>('');
  const [data, setData] = useState<Item[]>([]);

  const db = getFirestore(app);
  
  
  
  

  const getList = useCallback(() => {
    const getData = async () => {
      const docRef = doc(db, 'users', name);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as {items: Item[]};
        setData([...data.items])
        setMyItems && setMyItems(p => {
          const map = new Map(p);

          map.set(name, [...data.items.filter(i => i.buyer === selectedUser)]);

          return map;
        })
      }
    }

    getData();
  }, [db, name, selectedUser, setMyItems]);

  useEffect(() => {
    onSnapshot(doc(db, "users", name), (doc) => {
      getList();
    });
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

    setInput('');
  }, [data, db, input, name])

  return (
    <div className={`list ${og ? 'og' : ''}`}>
      <h4>{name}</h4>

      {og && <form onSubmit={onAdd}>
        <input placeholder='Enter a gift idea!' value={input} onChange={(e) => setInput(e.target.value)} required></input>
        <input type="submit" style={{padding: '0px 65px'}} value={'Add'}></input>
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