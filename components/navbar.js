import React, { useState, useEffect } from 'react'
import Router from 'next/Router'
import globalStyles from '../styles/global.module.css' 

function home(){
  try {
    Router.push("/")
  } catch (error) {
    console.error(error)
  }
}

function register(){
  try {
    Router.push("/registration")
  } catch (error) {
    console.error(error)
  }
}

export default function NavBar(){
  return (
    <div className={globalStyles.navbar}>
      <a><button className={globalStyles.logoButton} onClick={function(){home()}}>Data Genie</button></a>
      <a><button className={globalStyles.button3}>contact us</button></a>
      <a style={{float:"right"}}><button className={globalStyles.button2}>log in</button></a>
      <a style={{float:"right"}}><button onClick={function(){register()}} className={globalStyles.button1}>sign up</button></a>
    </div>
  )
}
