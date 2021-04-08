import globalStyles from '../../styles/global.module.css' 
import React, { useEffect, useState } from 'react' 
import NavBar from '../../navbar'
import Cookies from 'universal-cookie' 
import Router, {useRouter} from 'next/Router'
const axios = require('axios')
const { hostname } = require('../../config')

export default function PostDetail(){
  console.log(globalStyles.PageTitle)

  const [account, setAccount] = useState([])
  const router = useRouter()
  const { id } = router.query
    console.log(id)
  //const id = 32

  useEffect(() => {
  axios.get(`${hostname}/account/${id}`).then(res => {
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
          Organization:
        </div>
        <div style={{width:700, marginBottom:25}} className={globalStyles.PostSubTitle}>
          {account.org}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Title:
        </div>
        <div style={{width:700, marginBottom:25}} className={globalStyles.PostSubTitle}>
          {account.title}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          LinkedIn:
        </div>
        <div style={{width:700, marginBottom: 25}} className={globalStyles.PostSubTitle}>
          {account.linkedin}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          GitHub:
        </div>
        <div style={{width: 700, marginBottom: 25}} className={globalStyles.PostSubTitle}>
          {account.github}
        </div>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          SSRN:
        </div>
        <div style={{width: 700, marginBottom: 25}} className={globalStyles.PostSubTitle}>
          {account.ssrn}
        </div>
      </div>

    </div>
  </div>
  </div>
)}
