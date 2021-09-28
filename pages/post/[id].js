import globalStyles from '../../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../../components/navbar'
import formatDate from '../../utilities'
import Cookies from 'universal-cookie' 
import Router, {useRouter} from 'next/Router'
const axios = require('axios')
const { hostname } = require('../../config')

export default function PostDetail(){
  console.log(globalStyles.PageTitle)

  const [post, setPost] = useState([])
  const router = useRouter()
  const { id } = router.query
    console.log(id)
  //const id = 32

  useEffect(() => {
  console.log(id)
  if (Boolean(id)){
    axios.get(`${hostname}/posts/${id}`).then(res => {
      setPost(res.data)
      console.log(res.data)})
  }
  }, [id])

  function messageData(id){
    try {
      console.log("lookatme")
      const url = `${hostname}/messages/threads`
      const cookie = new Cookies()
      const accountId = cookie.get('accountId')
      const token = cookie.get('token')
      const body = {
        postId: id,
        accountId: accountId
      }
      const headers = { 
        headers: { 
          'token': token,
        } 
      } 
      axios.post(url, body, headers).then(res=>{
        const threadId = res.data.threadId
        Router.push(`/messaging/${threadId}`)
      })
    } catch (error) {
      console.error(error)
    }
  }

return(

  <div className={globalStyles.body}>

    {NavBar()}

  <div key={post.id}>

    <div className={globalStyles.container}>
      <div className={globalStyles.PostDetailContainer}>

        <div className={globalStyles.PostTitle}>
          {post.brief_description}
        </div>

        <div className={globalStyles.topBufferContainer}>
          <div className={globalStyles.PostMetaDataContainer}>
            <div className={globalStyles.RequestListingAccountPicContainer}>
              <img src='/images/blank-profile-picture.png' className={globalStyles.RequestListingAccountPic} />
            </div>

            <div className={globalStyles.RequestListingPostMetaData}>
              <div>Posted by <b>{`${post.username}`}</b> on {formatDate(`${post.created_at}`)}</div>
            </div>
          </div>

          <div className={globalStyles.usageContainer}>
            <div className={globalStyles.usageTag}>{post.usage} Use</div>
          </div>

        </div>

        <div>
          <div style={{width: 700, marginBottom: 25}} className={globalStyles.PostDetailedDescriptionFull}>
            {post.detailed_description}
          </div>
        </div>
      </div>

      <div style={{marginBottom: 10, marginTop: 10}} className={globalStyles.mainbutton}>
        <button onClick={function(){messageData(post.id)}} className={globalStyles.button4}>respond to request</button>
      </div>

    </div>
  </div>
  </div>
)}
