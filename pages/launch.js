import globalStyles from '../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../navbar'
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
const axios = require('axios')
const { hostname } = require('../config')

export default function Home(){
return (

  <div className={globalStyles.body}>

    {NavBar()}

  <div className={globalStyles.PageTitle}>
      Requested Sets
    </div>

    <div className={globalStyles.container}>
<div className={globalStyles.mainbutton}>
        <a href="#requestdata"><button onClick={function(){requestData()}} className={globalStyles.button4}>get started</button></a>
      </div>
    </div>
</div>
)}
