import globalStyles from '../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import Cookies from 'universal-cookie' 
import Router from 'next/Router'
import NavBar from '../components/navbar'
import formatDate from '../utilities'
const axios = require('axios')
const { hostname } = require('../config')

export default function Home(){
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get(`${hostname}/posts?index=1&batchSize=25`)
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  function requestData(){
    try {
      Router.push("/request")
    } catch (error) {
      console.error(error)
    }
  }

  function postDetails(id){
    try {
      Router.push(`/post/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  function displayName(post){
    try {
      const cookie = new Cookies()
      const accountId = cookie.get('accountId')
      if (post.account_id==accountId){
        return "You"
      } else {
        return post.username
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (

    <div className={globalStyles.body}>

      {NavBar()}

      <div className={globalStyles.PageTitle}>
        Requested Data
      </div>

      <div className={globalStyles.container}>

        <div className={globalStyles.mainbutton}>
          <a><button onClick={function(){requestData()}} className={globalStyles.button4}>request data</button></a>
        </div>

        {posts.map((post, index) => (
          <div key={index.toString()} className={globalStyles.RequestListing} onClick={function(){postDetails(post.id)}}>

            <div className={globalStyles.PostMetaDataContainer}>
              <div className={globalStyles.RequestListingAccountPicContainer}>
                <img src='/images/blank-profile-picture.png' className={globalStyles.RequestListingAccountPic} />
              </div>

              <div className={globalStyles.RequestListingPostMetaData}>
                <div>Posted by <b>{displayName(post)}</b> on {formatDate(`${post.created_at}`)}</div>
              </div>
            </div>

            <div className={globalStyles.PostBriefDescription}>
              {post.brief_description}
            </div>

            <div className={globalStyles.PostDetailedDescriptionContainer}>
              <div className={globalStyles.DescriptionText}>
                {post.detailed_description}
              </div>
            </div>

          </div>))}

      </div>
    </div>
)}
