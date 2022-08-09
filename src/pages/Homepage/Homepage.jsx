import React from 'react'
import { useSelector } from 'react-redux'
import SearchBar from '../../components/SearchBar/SearchBar'
// import Navbar from '../../components/Navbar/Navbar.jsx'
import './Homepage.css'

export default function Homepage () {

  // const applications = useSelector((state) => {
  //   return state.app.applications
  // })
  // console.log(applications)
  return (
    <div id='home'>
      <div>
        <SearchBar/>
      </div>
      <div id='content'>
      </div>
    </div>
  )
}
