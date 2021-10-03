import React, { useEffect, useState } from 'react' 
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
import NavBar from '../components/navbar'
import globalStyles from '../styles/global.module.css' 
import formatDate from '../utilities'
const axios = require('axios')
const { hostname } = require('../config')

export default function HelloWorld(){
  const [threads, setThreads] = useState([])

  useEffect(() => {
    const url=`${hostname}/messages/threads`
    const cookie = new Cookies()
    const token = cookie.get('token')
    const headers = { 
      headers: { 
        'token': token,
      } 
    } 
    axios.get(url, headers)
      .then(res => {
        setThreads(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  function viewThread(threadId){
    try {
      Router.push(`/messaging/${threadId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={globalStyles.body}>
      {NavBar()}
      <div className={globalStyles.container}>
        <div className={globalStyles.InboxContainer}>
          {threads.map((thread, index) => (
            <div key={index.toString()} onClick={function(){viewThread(thread.thread_id)}} className={globalStyles.ThreadContainer}>
              <div className={globalStyles.ThreadSubContainer}>
                <div className={globalStyles.LeftSubContainer}>
                  <div className={globalStyles.InboxAccountPicContainer}>
                    <img src='/images/blank-profile-picture.png' className={globalStyles.InboxAccountPic} />
                  </div>

                  <div className={globalStyles.InboxUserIdentifier}>
                    <div>{`${thread.account.username}`}</div>
                  </div>
                </div>
                <div className={globalStyles.RightSubContainer}>
                  <div className={globalStyles.InboxDateContainer}>
                    <div>{formatDate(`${thread.last_message.created_at}`)}</div>
                  </div>
                </div>
              </div>
              <div className={globalStyles.ThreadSubContainer}>
                <div className={globalStyles.InboxThreadBriefDescription}>{`${thread.post.brief_description}`}</div>
              </div>
              <div className={globalStyles.ThreadSubContainer}>
                <div className={globalStyles.InboxThreadLastMessage}>{`${thread.last_message.last_message}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
