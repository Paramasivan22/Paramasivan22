import React from 'react'

import { FaTrashAlt } from "react-icons/fa";

const Content = ({items,handleCheck,handledelete}) => {


 

  

  return (
    <>
      {(items.length) ? (
      <ul>
         {items.map((item) => (
          <li className='item' key={item.id}>
            <input 
            type="checkbox" 
            onChange={() => handleCheck(item.id)}
            checked ={item.checked}
            />
            <label
            style={(item.checked)?{textDecoration:'line-through'} : null}
            onDoubleClick={() => handleCheck(item.id)}>{item.item}</label>
            <FaTrashAlt
            role='button'
            onClick={() => handledelete(item.id)}
            tabIndex='0'
           />
          </li>
         ))}
      </ul>
      ) : (<p> List is empty</p>)
         }
    </>
  )

  
}

export default Content