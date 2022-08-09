import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'


export default function SearchBar () {

  return (
    <div>
        <div>
        <form onsubmit="event.preventDefault();" role="search">
            <label for="search">Search for stuff</label>
            <input id="search" type="search" placeholder="Search..." autofocus required />
            <button type="submit">Go</button>    
        </form> 
        </div>
    </div>

  )
}
