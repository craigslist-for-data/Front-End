import globalStyles from '../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../navbar'
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
const axios = require('axios')
const { hostname } = require('../config')

export default function Home(){
  console.log(globalStyles.PageTitle)
return (

  <div className={globalStyles.body}>

    {NavBar()}

    <div className={globalStyles.PageTitle}>
      Inbox
    </div>

    <div className={globalStyles.container}>

      <div /*key={index.toString()}*/ className={globalStyles.InboxMsgListing}>
        <div style={{float: "right"}} className={globalStyles.PostSubTitle5}>
          Unread messages: [#]
        </div>
        <div /*onClick={function(){displayData(post.id)}}*/ className={globalStyles.PostTitle}>
          Subject: [Set Title]
        </div>
        <div /*onClick={function(){displayProfile(post.account_id)}}*/ className={globalStyles.PostSubTitle}>
          Poster: | [username]
        </div>
        <div /*onClick={function(){displayData(post.id)}}*/ className={globalStyles.PostSubTitle}>
          Respondent: | [username]
        </div>
      </div>

    </div>
</div>
)}
