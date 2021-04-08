import globalStyles from '../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../navbar'
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
const axios = require('axios')
const { hostname } = require('../config')

export default function SendInvite(){
  console.log(globalStyles.PageTitle)

  const cookie = new Cookies()
  const accountId = cookie.get('accountId')
  const token = cookie.get('token')
  const [invite, setInvite] = useState('') 

  const headers = { 
    headers: { 
      'token': token,
    } 
  } 

  function sendInvite(){
    console.log(feedback)
    const url=`${hostname}/feedback`
    const body={
      feedback: feedback
    }

    axios.post(url, body, headers)
          .then(res => {
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
    Send an Invite
  </div>

  <div className={globalStyles.container}>

  <div>
    <div className={globalStyles.InputFieldName}>
      Invitee Email:
    </div>
    <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setInvite(e.target.value)}>
    </input>
  </div>

    <div className={globalStyles.mainbutton}>
      <a href="#invite"><button className={globalStyles.button4} onClick={function(){invite()}}>send invite</button></a>
    </div>

  </div>
</div>
)
}
