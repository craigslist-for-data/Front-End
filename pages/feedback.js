import globalStyles from '../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../navbar'
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
const axios = require('axios')
const { hostname } = require('../config')

export default function GiveFeedback(){
  console.log(globalStyles.PageTitle)

  const cookie = new Cookies()
  const accountId = cookie.get('accountId')
  const token = cookie.get('token')
  const [feedback, setFeedback] = useState('') 

  const headers = { 
    headers: { 
      'token': token,
    } 
  } 

  function giveFeedback(){
    console.log(feedback)
    const url=`${hostname}/feedback`
    const body={
      message: feedback, //passing front end feedback to backend message; flexibility after colon; rigidity before colon.
      accountId: accountId
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
    Give Us Feedback
  </div>

  <div className={globalStyles.container}>

    <textarea className={globalStyles.LargeTextBox} onChange={(e) => setFeedback(e.target.value)} >
    </textarea>

    <div className={globalStyles.mainbutton}>
      <a href="#feedback"><button className={globalStyles.button4} onClick={function(){giveFeedback()}}>give feedback</button></a>
    </div>

  </div>
</div>
)
}
