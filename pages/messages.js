import React, { useEffect, useState } from 'react' 
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
import NavBar from '../components/navbar'
import globalStyles from '../styles/global.module.css' 
import formatDate from '../utilities'
const axios = require('axios')
const { hostname } = require('../config')

export default function Messages(){
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

  function showBoldText(unread){
    try {
      const boldFormatting = (unread>0) ? {'fontWeight':'bold'} : {'fontWeight':'normal'}
      return boldFormatting
    } catch (error) {
      console.error(error)
    }
  }

  function showUnreadCount(unread){
    try {
      const unreadCountDisplay = (unread>0) ? {'display':'flex'} : {'display':'none'}
      return unreadCountDisplay
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={globalStyles.body}>
      {NavBar()}
      <div className={globalStyles.container}>
        <div className={globalStyles.InboxContainer}>
          {(threads.length==0) ?
            <div className={globalStyles.InboxEmptyContainer}>
              <div className={globalStyles.InboxEmptyText}>Message Inbox Empty</div>
              <div className={globalStyles.InboxEmptyPicContainer}>
                <img src='/images/empty-inbox_icon.png' className={globalStyles.InboxEmptyPic} />
              </div>
            </div>
            :
            <div>
              {threads.map((thread, index) => (
                <div key={index.toString()} onClick={function(){viewThread(thread.thread_id)}} style={showBoldText(thread.unread_messages)} className={globalStyles.ThreadContainer}>
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
                    <div style={showUnreadCount(thread.unread_messages)} className={globalStyles.InboxThreadUnreadCount}>{thread.unread_messages}</div>
                  </div>
                  <div className={globalStyles.ThreadSubContainer}>
                    <div className={globalStyles.InboxThreadLastMessage}>{`${thread.last_message.last_message}`}</div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  )
}
