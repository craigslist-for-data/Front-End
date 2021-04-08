import globalStyles from '../../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../../navbar'
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
    <div>
      <div className={globalStyles.PageTitle}>
        {post.topic}
      </div>
      <div onclick="document.location='VIEWAUTHOR.html'" className={globalStyles.PostSubTitle03}>
        | {post.account_id}
      </div>
    </div>

    <div className={globalStyles.container}>

      <div>
        <div className={globalStyles.InputFieldName}>
          Post Date:
        </div>
        <div style={{width:700, marginBottom:25}} className={globalStyles.PostSubTitle0}>
          {post.created_at}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Use for Requested Set:
        </div>
        <div style={{width:700, marginBottom:25}} className={globalStyles.PostSubTitle0}>
          {post.usage}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Purpose of Requested Set:
        </div>
        <div style={{width:700, marginBottom: 25}} className={globalStyles.PostSubTitle0}>
          {post.purpose}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Brief Description of Requested Set:
        </div>
        <div style={{width: 700, marginBottom: 25}} className={globalStyles.PostSubTitle0}>
          {post.brief_description}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Detailed Description of Requested Set:
        </div>
        <div style={{width: 700, marginBottom: 25}} className={globalStyles.PostSubTitle0}>
          {post.detailed_description}
        </div>
      </div>

      <div style={{marginBottom: 10, marginTop: 10}} className={globalStyles.mainbutton}>
        <button onClick={function(){messageData(post.id)}} className={globalStyles.button4}>respond to request</button>
      </div>

    </div>
  </div>
  </div>
)}
