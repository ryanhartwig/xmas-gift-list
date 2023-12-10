import './ListItem.css';

import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useCallback, useMemo } from "react"
import { app } from "./fb";
import { Item } from "./List"

import { Link, Typography, styled } from '@mui/material';

const ItemText = styled(Link)<{crossed?: boolean}>(({crossed}) => ({
  textDecoration: crossed ? 'line-through' : '',
  flexShrink: 1,
  whiteSpace: 'wrap',
  maxWidth: '80%',
  wordBreak: 'break-word',
  fontSize: 16,
}));

const extractUrl = (text: string): string | null => {
  const urlRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  const match = text.match(urlRegex);
  return match ? match[0] : null;
};

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

  const href = useMemo(() => extractUrl(item.item), [item.item]);

  return (
    <div className='list-item'>
      <ItemText
        underline='hover'
        target='_blank'
        href={href || undefined}
        as={href ? undefined : Typography}
      >
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