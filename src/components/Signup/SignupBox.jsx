import React, { useState } from 'react'
import './Signup.css'


const useInput = (initial) => {
  const [value, setValue] = useState(initial)
  const onChange = (e) => {
    setValue(e.target.value)
  }
  return [value, onChange]
}

export default function SignupBox (props) {
  const [username, usernameOnChange] = useInput('')
  const [password, passwordOnChange] = useInput('')
  const [first, firstOnChange] = useInput('')
  const [last, lastOnChange] = useInput('')

  const saveUser = (event) => {
    event.preventDefault();
    const body = {
      username,
      password,
      first,
      last
    }
    console.log('BODY ', body);
    console.log('Console log AFTER body.');

    fetch('http://localhost:3333/api/signup', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*'
      }
    })
      .then((data) => {
        console.log('RECEIVED DATA: ', data)
      })
      .catch((error) => console.log('FETCH ERROR: ', error))
  }

  return (
    <div id='signup-mainbox'>
      <div id='signup-form'>
        <div id='form-left'>
        </div>
        <div id='form-right'>
          <h2 id='signup-header'>Sign Up</h2>
          <form id="signupbox">
            <input
              type='text'
              placeholder='First Name'
              onChange={firstOnChange}
              id="signupinput"
              className= 'inputfield'
            /><br/>
            <input
              type='text'
              placeholder='Last Name'
              onChange={lastOnChange}
              id="signupinput"
              className= 'inputfield'
            /><br/>
            <input
              type='text'
              placeholder='Username'
              onChange={usernameOnChange}
              id="signupinput"
              className= 'inputfield'
            /><br/>
            <input
              type='password'
              placeholder='Password'
              onChange={passwordOnChange}
              id="signupinput"
              className= 'inputfield'
            /><br/>
            <input id="signupbtn" type='submit' value='Sign Up' onClick={saveUser} />
          </form>
          <div id='text'>
            <span id ='member'>Already a member?</span>
            <a href='/' id='backtologin'>Log in</a>
          </div>
        </div>
      </div>
    </div>
  )
}
