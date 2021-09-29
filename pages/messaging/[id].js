import globalStyles from '../../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../../components/navbar'
import formatDate from '../../utilities'
import Cookies from 'universal-cookie' 
import Router, {useRouter} from 'next/Router'
const axios = require('axios')
const { hostname } = require('../../config')

export default function Messaging() {

  const [messages, setMessages] = useState([])
  const router = useRouter()
  const { id } = router.query


  function messageFormat(message){
    const cookie = new Cookies()
    const accountId = cookie.get('accountId')
    if (accountId==message.account_id){
      return {'float':'right','color':'white','background-color':'#5B26F1'}
    } else {
      return {'float':'left','color':'black','background-color':'#e0e0e0'}
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
      setMessages(res.data)
    })
    }
  }, [id])

  return (

    <div className={globalStyles.body}>

      {NavBar()}

      <div>
          <div className={globalStyles.PageTitle}>
            Subject:
          </div>

          <div className={globalStyles.container}>
            <div className={globalStyles.MessageContainer}>
              {messages.map((message, index) => (
                <div key={index.toString()} style={messageFormat(message)} className={globalStyles.MessageBox}>{message.message}</div>
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
