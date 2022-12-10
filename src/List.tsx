import { useCallback, useState } from 'react';
import './List.css';

interface ListProps {
  name: string,
  og?: boolean,
  selectedUser: string,
}

interface Item {
  item: string,
  id: number,
  buyer: string,
}

export const List = ({name, og = false, selectedUser}: ListProps) => {


  
  const [items, setItems] = useState<Item[]>([{item: 'yes', id: 3, buyer: ''}]);

  const [input, setInput] = useState<string>('');

  const onAdd = useCallback((e: any) => {
    e.preventDefault();

    setItems(p => [...p, {item: input, id: Date.now(), buyer: '',}]);
    setInput('');
  }, [input])

  const setComplete = useCallback((id: number) => {
    const item = {...items.find(i => i.id === id)!};
    item.buyer = selectedUser;

    const index = items.findIndex(i => i.id === id);
    setItems(p => p.splice(index, 1, item));
  }, [items, selectedUser]);

  const undo = useCallback((id: number) => {
    const item = {...items.find(i => i.id === id)!};
    item.buyer = '';

    const index = items.findIndex(i => i.id === id);
    setItems(p => p.splice(index, 1, item));
  }, [items])
  
  return (
    <div className={`list ${og ? 'og' : ''}`}>
      <h4>{name}</h4>

      {og && <form onSubmit={onAdd}>
        <input placeholder='type wot u want' value={input} onChange={(e) => setInput(e.target.value)} required></input>
        <input type="submit" value={'Add (or press enter)'}></input>
      </form>}

      <div className='list-items'>
        {items.map(i => {
        return <div className='list-item' key={i.id}>
            <p style={{textDecoration: i.buyer && !og ? 'line-through' : ''}}>{i.item}</p>
            {og && <button onClick={() => setItems(p => p.filter(item => item.id !== i.id))}>delete</button>}
            {!og && !i.buyer && <button onClick={() => setComplete(i.id)}>I'll buy this</button>}
            {i.buyer === selectedUser && <button onClick={() => undo(i.id)}>undo</button>}
          </div>
        })}
      </div>
      
    </div>
  )
  
}