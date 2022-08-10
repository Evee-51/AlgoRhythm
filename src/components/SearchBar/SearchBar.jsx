import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'


export default function SearchBar (props) {
  const [barText, setBarText] = useState('');
  return (
    <div>
        <div>
        <form onSubmit={(event) => {
          event.preventDefault();
          props.handleChange(barText);
          console.log('Trying to search for: ', barText);
        }} role="search">
            <label htmlFor="search">Search for stuff</label>
            <input id="search" type="search" placeholder="Search..." onChange={(event) => {
              event.preventDefault();
              setBarText(event.target.value);
            }} autofocus required />
            <button type="submit">Go</button>    
        </form> 
        </div>
    </div>

  )
}
