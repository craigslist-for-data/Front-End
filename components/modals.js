import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import globalStyles from '../styles/global.module.css' 
const { hostname } = require('../config')
const axios = require('axios')

export function ContactModal(showModal, setShowModal){
  const displayModal = showModal ? {'display':'block'} : {'display':'none'}
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [disabledSubmit, setDisabledSubmit] = useState(true)

  function closeModal(){
    try {
      setText('')
      setSubmitted(false)
      setDisabledSubmit(true)
      setShowModal(false)
    } catch (error) {
      console.error(error)
    }
  }

  function updateText(text){
    try {
      setText(text)
      if (text.length>0){
        setDisabledSubmit(false)
      } else {
        setDisabledSubmit(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  function submit(){
    try {
      const url=`${hostname}/feedback`
      const body={
        message: text,
      }
      axios.post(url, body)
        .then(res => {
          setSubmitted(true)
        })
        .catch(err => {
          console.error(err)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className={globalStyles.background} style={displayModal}></div>
      <div className={globalStyles.modal} style={displayModal}>
        <div className={globalStyles.modalContainer}>
          <div className={globalStyles.exitButtonContainer}>
              <button className={globalStyles.exitButton} onClick={function(){closeModal()}}>x</button>
          </div>
          {
            submitted ?
            <div style={{'display':'flex','flex-direction':'column'}}>
              <div style={{'margin-top':'175px'}} className={globalStyles.ModalTextContentContainer}>
                <div className={globalStyles.PostTitle}>Thank you for contacting us!</div>
              </div>
              <div className={globalStyles.ModalTextContentContainer}>
                <div className={globalStyles.DescriptionText}>We will do our best to get back to you as quickly as possible.</div>
              </div>
              <div style={{'margin-top':'auto'}} className={globalStyles.ModalGeneralContentContainer}>
                <button className={globalStyles.closeButton} onClick={function(){closeModal()}}>Close</button>
              </div>
            </div>
            :
            <div>
              <div className={globalStyles.ModalTextContentContainer}>
                <div className={globalStyles.PostTitle}>
                  We'd love to hear from you!
                </div>
              </div>
              <div className={globalStyles.ModalTextContentContainer}>
                <div className={globalStyles.DescriptionText}>
                  Have feedback on the site? Can't find what you're looking for? Having technical difficulties? Want to get involved?
                  Please contact us with any questions or thoughts you have.
                  You can also email us directly at <div style={{'color':'#5B26F1'}}>craigslistfordata@gmail.com</div>
                </div>
              </div>
              <div className={globalStyles.ModalGeneralContentContainer}>
                <textarea value={text} style={{width:'80%'}} className={globalStyles.LargeTextBox} onChange={(e) => updateText(e.target.value)}></textarea>
              </div>
              <div className={globalStyles.ModalGeneralContentContainer}>
                <button className={globalStyles.button4} onClick={function(){submit()}} disabled={disabledSubmit}>Submit</button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export function RegistraionModal(showModal, setShowModal){
  const displayModal = showModal ? {'display':'block'} : {'display':'none'}

  return (
    <div>
      <div className={globalStyles.background} style={displayModal}></div>
      <div className={globalStyles.modal} style={displayModal}>
        <div className={globalStyles.modalContainer}>
          <div className={globalStyles.exitButtonContainer}>
              <button className={globalStyles.exitButton} onClick={function(){setShowModal(false)}}>x</button>
          </div>
          <div>Sign up!</div>
        </div>
      </div>
    </div>
  )
}
