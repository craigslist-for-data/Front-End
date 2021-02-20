import globalStyles from '../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
const axios = require('axios')
const { hostname } = require('../config')

export default function Request(){
  console.log(globalStyles.PageTitle)

  const cookie = new Cookies()
  const accountId = cookie.get('accountId')
  const token = cookie.get('token')
  const [topic, setTopic] = useState('') 
  const [usage, setUsage] = useState('') 
  const [purpose, setPurpose] = useState('') 
  const [brief_description, setBrief_description] = useState('') 
  const [detailed_description, setDetailed_description] = useState('') 
  const [links, setLinks] = useState('') 

  const headers = { 
    headers: { 
      'token': token,
    } 
  } 

  function request(){
    console.log(topic, purpose, brief_description, detailed_description, links)
    const url=`${hostname}/posts`
    const body={
      accountId: accountId,
      topic: topic,
      usage: usage,
      purpose: purpose,
      briefDesc: brief_description,
      detailedDesc: detailed_description,
      links: links
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

    <div className={globalStyles.navbar}>
      <a style={{fontWeight: "bold", fontSize: 32}} href="HOMEPAGE.html">Lamp</a>
      <a><button onClick="document.location='GIVEUSFEEDBACK.html'" className={globalStyles.button3}>give us feedback</button></a>
      <a><button onClick="document.location='SENDANINVITE.html'" className={globalStyles.button1}>invite</button></a>
      <a style={{float:"right"}}><button onClick="document.location='LOGIN.html'" className={globalStyles.button2}>log in</button></a>
      <a style={{float:"right"}}><button onClick="document.location='SIGNUP.html'" className={globalStyles.button1}>sign up</button></a>
    </div>

    <div className={globalStyles.PageTitle}>
      Request a Set
    </div>

    <div className={globalStyles.container}>

      <div>
        <div className={globalStyles.InputFieldName}>
           Topic of Requested Set:*
        </div>
        <input style={{display:"inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setTopic(e.target.value)} >
        </input>
      </div>

      <div style={{height:"100", width:"700"}}>
        <div className= {globalStyles.InputFieldName}>
          Use for Requested Set:*
        </div>
          <input type="radio" id="checkboxtext" name="vehicle1" value="Individual" checked={usage=='Personal'}  onChange={(e) => setUsage('Personal')} />Personal
          <input type="radio" id="checkboxtext" name="vehicle2" value="Academic" checked={usage=='Academic'}  onChange={(e) => setUsage('Academic')}/>Academic
          <input type="radio" id="checkboxtext" name="vehicle3" value="Business" checked={usage=='Business'}  onChange={(e) => setUsage('Business')}/>Business
      </div>

      <div>
        <div className= {globalStyles.InputFieldName}>
          Purpose of Requested Set:*
        </div>
        <input style={{display:"inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setPurpose(e.target.value)} >
        </input>
      </div>

      <div>
        <div className= {globalStyles.InputFieldName}>
          Brief Description of Requested Set:*
        </div>
        <input style={{display:"inline-block"}} className={globalStyles.SmallTextBox} onChange={(e) => setBrief_description(e.target.value)} >
        </input>
      </div>

      <div>
        <div className= {globalStyles.InputFieldName}>
          Detailed Description of Requested Set:*
        </div>
        <textarea className={globalStyles.LargeTextBox} onChange={(e) => setDetailed_description(e.target.value)} >
        </textarea>
      </div>

      <div>
        <div className= {globalStyles.InputFieldName}>
          Link(s) to current project:
        </div>
        <textarea className={globalStyles.LargeTextBox} onChange={(e) => setLinks(e.target.value)} >
        </textarea>
      </div>

      <div className={globalStyles.mainbutton}>
        <a href="#requestdata"><button className={globalStyles.button4} onClick={function(){request()}}>request set</button></a>
      </div>
    </div>
  </div>
  )
}
