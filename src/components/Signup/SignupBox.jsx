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
  const [inputPassword, passwordOnChange] = useInput('')
  const [firstname, firstNameOnChange] = useInput('')
  const [lastname, lastNameOnChange] = useInput('')

  const saveUser = () => {
    console.log('saveuser')
    const body = {
      username,
      inputPassword,
      firstname,
      lastname
    }

    fetch('/api/users', {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => console.log(error))
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
              onChange={firstNameOnChange}
              id="signupinput"
              className= 'inputfield'
            /><br/>
            <input
              type='text'
              placeholder='Last Name'
              onChange={lastNameOnChange}
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
