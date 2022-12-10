import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useCallback } from "react"
import uuid from "react-uuid";
import { app } from "./fb";
import { Item } from "./List"

interface ListItemProps {
  item: Item,
  og: boolean,
  selectedUser: string,
  data: Item[],
  getList: () => void,
}

export const ListItem = ({item, og, selectedUser, data, getList}: ListItemProps) => {


  const db = getFirestore(app);
  
  const removeItem = useCallback((id: string) => {
    const items = [...data].filter(i => i.id !== item.id);

    const userRef = doc(db, 'users', item.belongsto);
    setDoc(userRef, { items: items});

    getList();
  }, [data, db, getList, item.belongsto, item.id]);

  const toggleBuy = useCallback((id: string) => {
    const items = [...data];
    const index = items.findIndex(i => i.id === id);
    const buyer = items[index].buyer;

    items[index].buyer = buyer ? '' : selectedUser;

    const userRef = doc(db, 'users', item.belongsto);
    setDoc(userRef, { items: items});

    getList();
  }, [data, db, getList, item.belongsto, selectedUser]);


  return (
    <div className='list-item'>
      <p style={{textDecoration: item.buyer && !og ? 'line-through' : ''}}>{item.item}</p>

      {og && <button onClick={() => removeItem(item.id)}>delete</button>}
      {!og && !item.buyer && <button onClick={() => toggleBuy(item.id)}>I'll buy this</button>}
      {item.buyer === selectedUser && <button onClick={() => toggleBuy(item.id)}>buying(undo)</button>}
      </div>
  )
}