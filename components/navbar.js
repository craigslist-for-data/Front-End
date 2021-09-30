import React, { useState, useEffect } from 'react'
import Router from 'next/Router'
import {ContactModal, RegistraionModal} from './modals'
import globalStyles from '../styles/global.module.css' 

export default function NavBar(){
  const [showContactModal, setShowContactModal] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)

  function home(){
    try {
      Router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  function register(){
    try {
      setShowRegistrationModal(true)
    } catch (error) {
      console.error(error)
    }
  }

  function contact(){
    try {
      setShowContactModal(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {ContactModal(showContactModal, setShowContactModal)}
      {RegistraionModal(showRegistrationModal, setShowRegistrationModal)}
      <div className={globalStyles.navbar}>
        <a><button className={globalStyles.logoButton} onClick={function(){home()}}>Data Genie</button></a>
        <a><button onClick={function(){contact()}} className={globalStyles.button3}>contact us</button></a>
        <a style={{float:"right"}}><button onClick={function(){register()}} className={globalStyles.button2}>log in</button></a>
        <a style={{float:"right"}}><button onClick={function(){register()}} className={globalStyles.button1}>sign up</button></a>
      </div>
    </div>
  )
}
