import globalStyles from '../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../navbar'
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
const axios = require('axios')
const { hostname } = require('../config')

export default function LogIn(){
  console.log(globalStyles.PageTitle)

  const cookie = new Cookies()
  const accountId = cookie.get('accountId')
  const token = cookie.get('token')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  const headers = { 
    headers: { 
      'token': token,
    } 
  } 

  function logIn(){
    console.log(logIn)
    const url=`${hostname}/account/login`
    const body={
      username: username,
      password: password
    }

    axios.post(url, body, headers)
          .then(res => {
            const cookie = new Cookies() 
            cookie.set('accountId', res.data.accountId, { path: '/',  maxAge: 60 * 60 * 24 * 365}) 
            cookie.set('token', res.data.token, { path: '/',  maxAge: 60 * 60 * 24 * 365})
            cookie.set('hasToken', res.data.hasToken, { path: '/',  maxAge: 60 * 60 * 24 * 365})
            Router.push("/home")
          })
          .catch(err => {
            console.error(err)
          })
} 

return(
  <div className={globalStyles.body}>

    {NavBar()}

  <div className={globalStyles.PageTitle}>
    Log In
  </div>

  <div className={globalStyles.container}>

  <div>
    <div className={globalStyles.InputFieldName}>
      Username:
    </div>
    <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setUsername(e.target.value)}>
    </input>
  </div>

  <div>
    <div className={globalStyles.InputFieldName}>
      Password:
    </div>
    <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setPassword(e.target.value)}>
    </input>
  </div>

    <div className={globalStyles.mainbutton}>
      <a href="#invite"><button className={globalStyles.button4} onClick={function(){logIn()}}>log in</button></a>
    </div>

  </div>
</div>
)
}
