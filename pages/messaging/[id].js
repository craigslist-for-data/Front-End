import globalStyles from '../../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../../navbar'
import Cookies from 'universal-cookie' 
import Router, {useRouter} from 'next/Router'
const axios = require('axios')
const { hostname } = require('../../config')

export default function Messaging() {

  const [messages, setMessages] = useState([])
  const router = useRouter()
  const { id } = router.query

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

            <div style={{marginLeft: -80}} className={globalStyles.MessageBox}>
              <div /*onclick="document.location='VIEWAUTHOR.html'"*/style={{fontWeight: "bold"}}>[Respondent Username]:</div>
            </div>

            <div style={{marginLeft: 80}} className={globalStyles.MessageBox}>
              <div /*onclick="document.location='VIEWAUTHOR.html'"*/style={{fontWeight: "bold"}}>[Requestor Username]:</div>
            </div>

            <textarea className={globalStyles.LargeTextBox}>
            </textarea>

            <div className={globalStyles.mainbutton}>
              <a href="#requestdata"><button className={globalStyles.button4}>submit</button></a>
            </div>

          </div>
      </div>
  </div>
)}
