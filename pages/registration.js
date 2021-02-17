import globalStyles from '../styles/global.module.css' 

import React, { useEffect, useState } from 'react' 

import Cookies from 'universal-cookie' 

import Router from 'next/Router'

const axios = require('axios')

export default function Registration(){
  console.log(globalStyles.PageTitle)

  const [username, setUsername] = useState('') 
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [reenterPassword, setReenterPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [linkedIn, setLinkedIn] = useState('')
  const [gitHub, setGitHub] = useState('')
  const [sSRN, setSSRN] = useState('')
  const [organizationCompany, setOrganizationCompany] = useState('')
  const [title, setTitle] = useState('')

  function register(){
    console.log(username, email, name, password, reenterPassword, phone, linkedIn, gitHub, sSRN, organizationCompany, title)
    const url="http://0.0.0.0:8080/account/register"
    const body={
      username: username,
      email: email,
      name: name,
      password: password,
      phone: phone,
      linkedin: linkedIn,
      github: gitHub,
      ssrn: sSRN,
      org: organizationCompany,
      title: title
    }
    axios.post(url, body)
          //set a cookie (and auth token), advance to the next page
          .then(res => {                                //what get back from server
            const cookie = new Cookies() 
            cookie.set('accountId', res.data.accountId) 
            cookie.set('token', res.data.token)
            cookie.set('hasToken', res.data.hasToken)
            Router.push("/")
          })
          .catch(err => {
            console.error(err)
          })
  } 

  return (
  <div className={globalStyles.body}>

    <div className={globalStyles.navbar}>
      <a style={{fontWeight: "bold", fontSize: 32}} href="HOMEPAGE.html">Lamp</a>
      <a><button onClick="document.location='GIVEUSFEEDBACK.html'" className={`${globalStyles.button3} button3`}>give us feedback</button></a>
      <a><button onClick="document.location='SENDANINVITE.html'" className={`${globalStyles.button1} button1`}>invite</button></a>
      <a style={{float:"right"}}><button onClick="document.location='LOGIN.html'" className={`${globalStyles.button2} button2`}>log in</button></a>
      <a style={{float:"right"}}><button onClick="document.location='SIGNUP.html'" className={`${globalStyles.button1} button1`}>sign up</button></a>
    </div>

    <div className={globalStyles.PageTitle}>
      Sign Up
    </div>

    <div className= {globalStyles.container}>

      <div>
        <div className={globalStyles.InputFieldName}>
          Username:*
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setUsername(e.target.value)} >
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Email:*
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setEmail(e.target.value)} >
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Name:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setName(e.target.value)}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Password:*
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setPassword(e.target.value)}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Reenter Password:*
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setReenterPassword(e.target.value)}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Phone:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setPhone(e.target.value)}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          LinkedIn:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setLinkedIn(e.target.value)}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          GitHub:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setGitHub(e.target.value)}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          SSRN:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setSSRN(e.target.value)}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Organization/Company:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setOrganizationCompany(e.target.value)}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Title:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setTitle(e.target.value)}>
        </input>
      </div>

      <div className={globalStyles.mainbutton}>
        <a href="#requestdata"><button className={`${globalStyles.button4} button4`} onClick={function(){register()}} >sign up</button></a>
      </div>
    </div>
  </div>


  )
}
