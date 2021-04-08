import globalStyles from '../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../navbar'
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
const axios = require('axios')
const { hostname } = require('../config')

export default function Home(){
  console.log(globalStyles.PageTitle)

  const [posts, setPosts] = useState([])
  const [accounts, setAccounts] = useState([])

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

  function displayData(id){
    try {
      Router.push(`/postdetail/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

//remove if problem
  function displayProfile(id){
    try {
      Router.push(`/profile/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

return (

  <div className={globalStyles.body}>

    {NavBar()}

    <div className={globalStyles.PageTitle}>
      Requested Sets
    </div>

    <div className={globalStyles.container}>

      <div className={globalStyles.mainbutton}>
        <a href="#requestdata"><button onClick={function(){requestData()}} className={globalStyles.button4}>request data</button></a>
      </div>

      {posts.map((post, index) => (
        <div key={index.toString()} className={globalStyles.RequestListing}>
          <div style={{float: "right"}} className={globalStyles.PostSubTitle5}>
            {post.created_at}
          </div>
          <div onClick={function(){displayData(post.id)}} className={globalStyles.PostTitle}>
            {post.topic}
          </div>
          <div onClick={function(){displayProfile(post.account_id)}} className={globalStyles.PostSubTitle}>
            | {post.account_id}
          </div>
          <div onClick={function(){displayData(post.id)}} className={globalStyles.PostSubTitle2}>
            {post.brief_description}
          </div>
        </div>))}

    </div>
</div>
)}
