import globalStyles from '../../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../../components/navbar'
import formatDate from '../../utilities'
import Cookies from 'universal-cookie' 
import Router, {useRouter} from 'next/Router'
const axios = require('axios')
const { hostname } = require('../../config')

export default function Messaging() {
  const [postInfo, setPostInfo] = useState({})
  const [counterpartyInfo, setCounterpartyInfo] = useState({})
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [disabledSend, setDisabledSend] = useState(true)

  const router = useRouter()
  const { id } = router.query

  const cookie = new Cookies()
  const accountId = cookie.get('accountId')
  const token = cookie.get('token')
  const headers = { 
    headers: { 
      'token': token,
    } 
  } 

  function messageFormat(message){
    if (accountId==message.account_id){
      return {'margin-left':'auto','color':'white','background-color':'#5B26F1'}
    } else {
      return {'margin-right':'auto','color':'black','background-color':'#e0e0e0'}
    }
  }

  useEffect(() => {
  if(Boolean(id)){
    const url = `${hostname}/messages/${id}`
    axios.get(url, headers)
      .then(res => {
        setPostInfo(res.data.post_info)
        const counterParty = res.data.participants_info.filter(x => (x.account_id)!=accountId)
        setCounterpartyInfo(counterParty[0])
        setMessages(res.data.messages)
      })
      .catch(err => {
        console.error(err)
      })
    }
  }, [id])

  function updateNewMessage(text){
    try {
      setNewMessage(text)
      if (text.length>0){
        setDisabledSend(false)
      } else {
        setDisabledSend(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  function sendMessage(){
    try {
      const url = `${hostname}/messages`
      const body = {
        threadId: id,
        accountId: accountId,
        message: newMessage,
      }
      axios.post(url, body, headers)
        .then(res => {
          const sentMessage = [{
            account_id: accountId,
            message: newMessage,
          }]
          setMessages(messages.concat(sentMessage))
          setNewMessage('')
          setDisabledSend(true)
        })
        .catch(err => {
          console.error(err)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (

    <div className={globalStyles.body}>

      {NavBar()}

      <div>
          <div className={globalStyles.PageTitle}>
            Subject: {postInfo.brief_description}
          </div>

          <div className={globalStyles.container}>

            <div className={globalStyles.MessagePageContainer}>

              <div className={globalStyles.CounterPartyContainer}>
                <div className={globalStyles.CounterpartyAccountPicContainer}>
                  <img src='/images/blank-profile-picture.png' className={globalStyles.CounterpartyAccountPic} />
                </div>

                <div className={globalStyles.RequestListingPostMetaData}>
                  <div><b>{counterpartyInfo.username}</b></div>
                </div>
              </div>

              {messages.map((message, index) => (
                <div className={globalStyles.MessagesContainer}>
                  <div key={index.toString()} style={messageFormat(message)} className={globalStyles.MessageBox}>{message.message}</div>
                </div>
              ))}
              <textarea value={newMessage} style={{marginTop:'30px'}} className={globalStyles.LargeTextBox} onChange={(e) => updateNewMessage(e.target.value)}></textarea>
            </div>

            <div className={globalStyles.mainbutton}>
              <a><button className={globalStyles.button4} onClick={function(){sendMessage()}} disabled={disabledSend}>submit</button></a>
            </div>

          </div>
      </div>
  </div>
)}
