import globalStyles from './styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import Link from 'next/link' 
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
const { hostname } = require('./config')
const axios = require('axios')

export default function NavBar() {

  const cookie = new Cookies()
  const accountId = cookie.get('accountId')
  const token = cookie.get('token')
  const [account, setAccount] = useState([])
  const headers = { headers: { 'token': token} } 

  useEffect(() => {
    if (Boolean(accountId)) {
      const url = `${hostname}/account/${accountId}`
      axios.get(url, headers).then(res => {
        setAccount(res.data)
        console.log(res.data)})  
    }
  }, [accountId])

  function logOut(){
    const cookie = new Cookies() 
    cookie.remove('accountId')
    cookie.remove('token')
    cookie.remove('hasToken')
    Router.push("/home")
  }

    return (
      <div className={globalStyles.navbar}>
        <Link href="/home"><a style={{fontWeight: "bold", fontSize: 32}}>dataGenie</a></Link>
        <Link href="/feedback"><a><button className={globalStyles.button3}>give us feedback</button></a></Link>
        <Link href="/invite"><a><button className={globalStyles.button1}>invite</button></a></Link>
        {Boolean(accountId) ? <Link href={`/account/${accountId}`}><a style={{float:"right"}}>{account.username}</a></Link> :
          <Link href="/login"><a style={{float:"right"}}><button className={globalStyles.button2}>log in</button></a></Link>
        }
        {Boolean(accountId) ? <a style={{float:"right"}}><button onClick={function(){logOut()}} className={globalStyles.button1}>log out</button></a> :
          <Link href="/registration"><a style={{float:"right"}}><button className={globalStyles.button1}>sign up </button></a></Link>
        }
      </div>
    )
}
