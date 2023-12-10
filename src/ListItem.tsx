import './ListItem.css';

import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useCallback } from "react"
import { app } from "./fb";
import { Item } from "./List"

import { Typography, styled } from '@mui/material';

const ItemText = styled(Typography)<{crossed?: boolean}>(({crossed}) => ({
  textDecoration: crossed ? 'line-through' : '',
}));

interface ListItemProps {
  item: Item,
  og: boolean,
  selectedUser: string,
  data: Item[],
  getList: () => void,
}


export const ListItem = ({item, og, selectedUser, data, getList}: ListItemProps) => {
  const db = getFirestore(app);
  
  const removeItem = useCallback(() => {
    const items = [...data].filter(i => i.id !== item.id);

    const userRef = doc(db, 'users', item.belongsto);
    setDoc(userRef, { items: items});
  }, [data, db, item.belongsto, item.id]);

  const toggleBuy = useCallback((anon: boolean = false) => {
    const items = [...data];
    const index = items.findIndex(i => i.id === item.id);
    const buyer = items[index].buyer;

    items[index].buyer = buyer ? '' : selectedUser;
    items[index].anonymous = anon;

    const userRef = doc(db, 'users', item.belongsto);
    setDoc(userRef, { items: items});
  }, [data, db, item.belongsto, item.id, selectedUser]);


  console.log(crypto.randomUUID());
  return (
    <div className='list-item'>
      <ItemText crossed={!!item.buyer && !og}>
        {item.item}
      </ItemText>

      {og && <button onClick={() => removeItem()}>delete</button>}
      {!og && !item.buyer && <div className='buy-options'>
          <button onClick={() => toggleBuy()}>I'll buy this</button>
          <button onClick={() => toggleBuy(true)}>Buy as Anon</button>
        </div>}
      {item.buyer === selectedUser ? 
        <button className="buying" onClick={() => toggleBuy()}>{item.anonymous ? 'anon' : 'buying'}(undo)</button>
      : item.buyer && !og ? <p style={{fontSize: '12px'}}>({item.anonymous ? 'Anon' : item.buyer})</p> : null}
      
      </div>
  )
}