import globalStyles from '../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
const axios = require('axios')
const { hostname } = require('../config')

export default function Home(){
  console.log(globalStyles.PageTitle)

  const [posts, setPosts] = useState([])

  useEffect(() => {
  axios.get(`${hostname}/posts?index=1&batchSize=35`).then(res => {
    setPosts(res.data)})
  }, [])

  function requestData(){
    try {
      Router.push("/request")
    } catch (error) {
      console.error(error)
    }
  }

return (

  <div className={globalStyles.body}>

  <div className={globalStyles.navbar}>
    <a style={{fontWeight: "bold", fontSize: 32}} href="HOMEPAGE.html">Lamp</a>
    <a><button onClick="document.location='GIVEUSFEEDBACK.html'" className={globalStyles.button3}>give us feedback</button></a>
    <a><button onClick="document.location='SENDANINVITE.html'" className={globalStyles.button1}>invite</button></a>
    <a style={{float:"right"}}><button onClick="document.location='LOGIN.html'" className={globalStyles.button2}>log in</button></a>
    <a style={{float:"right"}}><button onClick="document.location='SIGNUP.html'" className={globalStyles.button1}>sign up</button></a>
  </div>

    <div className={globalStyles.PageTitle}>
      Requested Sets
    </div>

    <div className={globalStyles.container}>

      <div className={globalStyles.mainbutton}>
        <a href="#requestdata"><button onClick={function(){requestData()}} className={globalStyles.button4}>request data</button></a>
      </div>

      {posts.map((post, index) => (
        <div key={index.toString()} className={globalStyles.RequestListing}>
          <div onClick="document.location='VIEWAREQUEST.html'" className={globalStyles.PostTitle}>
            {post.topic}
          </div>
          <div onClick="document.location='VIEWAUTHOR.html'" className={globalStyles.PostSubTitle}>
            | {post.account_id}
          </div>
          <div style={{float: "right"}} className={globalStyles.PostSubTitle}>
            {post.created_at}
          </div>
          <div onClick="document.location='VIEWAREQUEST.html'" className={globalStyles.PostSubTitle2}>
            {post.brief_description}
          </div>
        </div>))}

    </div>
</div>
)}
