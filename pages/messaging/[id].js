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

  const router = useRouter()
  const { id } = router.query

  const cookie = new Cookies()
  const accountId = cookie.get('accountId')

  function messageFormat(message){
    if (accountId==message.account_id){
      return {'margin-left':'auto','color':'white','background-color':'#5B26F1'}
    } else {
      return {'margin-right':'auto','color':'black','background-color':'#e0e0e0'}
    }
  }

  useEffect(() => {
  if(Boolean(id)){
    const cookie = new Cookies()
    const token = cookie.get('token')
    const url = `${hostname}/messages/${id}`
    const headers = { 
          headers: { 
            'token': token,
          } 
        } 
    axios.get(url, headers).then(res => {
      console.log(res.data)
      setPostInfo(res.data.post_info)
      console.log(res.data.participants_info)
      const counterParty = res.data.participants_info.filter(x => (x.account_id)!=accountId)
      console.log(counterParty)
      setCounterpartyInfo(counterParty[0])
      console.log(counterParty[0])
      setMessages(res.data.messages)
    })
    }
  }, [id])

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
              <textarea style={{marginTop:'30px'}} className={globalStyles.LargeTextBox}></textarea>
            </div>

            <div className={globalStyles.mainbutton}>
              <a><button className={globalStyles.button4}>submit</button></a>
            </div>

          </div>
      </div>
  </div>
)}
