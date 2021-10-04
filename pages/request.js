import globalStyles from '../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
import NavBar from '../components/navbar'
const axios = require('axios')
const { hostname } = require('../config')

export default function Request(){

  const cookie = new Cookies()
  const accountId = cookie.get('accountId')
  const token = cookie.get('token')
  const [briefDescription, setBriefDescription] = useState('') 
  const [briefDescriptionCounter, setBriefDescriptionCounter] = useState(0)
  const [usage, setUsage] = useState('') 
  const [detailedDescription, setDetailedDescription] = useState('') 
  const [detailedDescriptionCounter, setDetailedDescriptionCounter] = useState(0)
  const [websiteLink, setWebsiteLink] = useState('') 
  const [githubLink, setGithubLink] = useState('') 

  function changeBriefDescription(str){
    setBriefDescriptionCounter(str.length)
    setBriefDescription(str)
    return
  }

  function changeDetailedDescription(str){
    setDetailedDescriptionCounter(str.length)
    setDetailedDescription(str)
    return
  }

  const headers = { 
    headers: { 
      'token': token,
    } 
  } 

  function request(){
    const url=`${hostname}/posts`
    const body={
      accountId: accountId,
      briefDesc: briefDescription,
      usage: usage,
      detailedDesc: detailedDescription,
      website: websiteLink,
      github: githubLink,
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
      Request Data
    </div>

    <div className={globalStyles.container}>

      <div className={globalStyles.InputFieldContainer}>
        <div className={globalStyles.InputFieldName}>
          Brief Description of Requested Set:*
        </div>
        <input type="text" placeholder="e.g. Geospatial orbit data from 2019-2020" maxLength={64} className={globalStyles.SmallTextBox} onChange={(e) => changeBriefDescription(e.target.value)} ></input>
        <div className={globalStyles.TextCounter}>{briefDescriptionCounter}/64 Characters Used</div>
      </div>

      <div style={{height:"100", width:"700"}} className={globalStyles.InputFieldContainer}>
        <div className={globalStyles.InputFieldNameCentered}>
          Use for Requested Set:*
        </div>
        <div className={globalStyles.InputRadioContainerCentered}>
          <input type="radio" id="checkboxtext" name="vehicle1" value="Individual" checked={usage=='Personal'}  onChange={(e) => setUsage('Personal')} />Personal
          <input type="radio" id="checkboxtext" name="vehicle2" value="Academic" checked={usage=='Academic'}  onChange={(e) => setUsage('Academic')}/>Academic
          <input type="radio" id="checkboxtext" name="vehicle3" value="Business" checked={usage=='Business'}  onChange={(e) => setUsage('Business')}/>Business
        </div>
      </div>

      <div className={globalStyles.InputFieldContainer}>
        <div className= {globalStyles.InputFieldName}>
          Detailed Description of Requested Set:*
        </div>
        <textarea placeholder="Please provide further details on the data you are looking for (e.g. fields, time period, etc) and the intended use of that data" maxLength={1000} className={globalStyles.LargeTextBox} onChange={(e) => changeDetailedDescription(e.target.value)} ></textarea>
        <div className={globalStyles.TextCounter}>{detailedDescriptionCounter}/1000 Characters Used</div>
      </div>

      <div className={globalStyles.InputFieldContainer}>
        <div className={globalStyles.InputFieldName}>
          Link to Project Website:
        </div>
        <input placeholder={"https://www.datagenie.org"} className={globalStyles.SmallTextBox} onChange={(e) => setWebsiteLink(e.target.value)} ></input>
      </div>

      <div className={globalStyles.InputFieldContainer}>
        <div className={globalStyles.InputFieldName}>
          Path to Github Repo:
        </div>
        <div className={globalStyles.UrlPathContainer}>
          <div className={globalStyles.UrlPathHostContainer}>https://github.com</div>
          <input placeholder={"/craigslist-for-data"} className={globalStyles.SmallTextBox} onChange={(e) => setGithubLink(e.target.value)} ></input>
        </div>
      </div>

      <div className={globalStyles.mainbutton}>
        <a><button className={globalStyles.button4} onClick={function(){request()}}>post</button></a>
      </div>
    </div>
  </div>
  )
}
