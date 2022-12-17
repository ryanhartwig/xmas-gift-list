import { useEffect, useState } from 'react';
import './Buying.css';
import { Item } from './List';

interface BuyingProps {
  itemsMap: Map<string, Item[]>,
}

export const Buying = ({itemsMap}: BuyingProps) => {

  const [items, setItems] = useState<Item[]>([]);


  useEffect(() => {
    const arr: Item[] = [];
    itemsMap.forEach(i => {
      arr.push(...i);
    });

    setItems(arr);
  }, [itemsMap]);

  return (
    <div className='Buying'>
      {items.map((i) => 
      <div className='Buying-item'>
        <p>{i.item}</p>
        <p>for {i.belongsto}</p>
      </div>)}
    </div>
  )
}