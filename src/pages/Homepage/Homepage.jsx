import React from 'react'
import { useSelector } from 'react-redux'

import './Homepage.css'

export default function Homepage () {

  const applications = useSelector((state) => {
    return state.app.applications
  })
  console.log(applications)
  return (
    <div id='home'>
      <div>
      </div>
      <div id='content'>
      </div>
    </div>
  )
}
