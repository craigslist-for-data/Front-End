import globalStyles from '../../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../../navbar'
import Cookies from 'universal-cookie' 
import Router, {useRouter} from 'next/Router'
const axios = require('axios')
const { hostname } = require('../../config')

export default function PostDetail(){
  console.log(globalStyles.PageTitle)


  const cookie = new Cookies()
  const accountId = cookie.get('accountId')
  const token = cookie.get('token')
  const [account, setAccount] = useState([])
  const headers = { headers: { 'token': token} } 

  useEffect(() => {
    const url = `${hostname}/account/${accountId}`
    axios.get(url, headers).then(res => {
      setAccount(res.data)
      console.log(res.data)})
  }, [])

  function requestData(){
      try {
        Router.push("/request")
      } catch (error) {
        console.error(error)
      }
    }

return(

  <div className={globalStyles.body}>

    {NavBar()}

  <div key={account.id}>
    <div>
      <div className={globalStyles.PageTitle}>
        | {account.username}
      </div>
    </div>

    <div className={globalStyles.container}>

      <div>
        <div className={globalStyles.InputFieldName}>
          Email:
        </div>
        <div style={{width:700, marginBottom:25}} className={globalStyles.PostSubTitle0}>
          {account.email}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Organization:
        </div>
        <div style={{width:700, marginBottom:25}} className={globalStyles.PostSubTitle0}>
          {account.org}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Title:
        </div>
        <div style={{width:700, marginBottom:25}} className={globalStyles.PostSubTitle0}>
          {account.title}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          LinkedIn:
        </div>
        <div style={{width:700, marginBottom: 25}} className={globalStyles.PostSubTitle0}>
          {account.linkedin}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          GitHub:
        </div>
        <div style={{width: 700, marginBottom: 25}} className={globalStyles.PostSubTitle0}>
          {account.github}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          SSRN:
        </div>
        <div style={{width: 700, marginBottom: 25}} className={globalStyles.PostSubTitle0}>
          {account.ssrn}
        </div>
      </div>

    </div>
  </div>
  </div>
)}
