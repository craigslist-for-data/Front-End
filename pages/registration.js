import globalStyles from '../styles/global.module.css' 

export default function Registration(){
  console.log(globalStyles.PageTitle)
  return (

    <div>



    <div className={globalStyles.navbar}>
      <a style={{fontWeight: "bold", fontSize: 32}} href="HOMEPAGE.html">Lamp</a>
      <a><button onclick="document.location='GIVEUSFEEDBACK.html'" className={`${globalStyles.button} button3`}>give us feedback</button></a>
      <a><button onclick="document.location='SENDANINVITE.html'" className={`${globalStyles.button} button1`}>invite</button></a>
      <a style={{float:"right"}}><button onclick="document.location='LOGIN.html'" className={`${globalStyles.button} button2`}>log in</button></a>
      <a style={{float:"right"}}><button onclick="document.location='SIGNUP.html'" className={`${globalStyles.button} button1`}>sign up</button></a>
    </div>

    <div className={globalStyles.PageTitle}>
      Sign Up
    </div>

    <div className= {globalStyles.container}>

      <div>
        <div className={globalStyles.InputFieldName}>
          Username:*
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Name:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Password:*
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Reenter Password:*
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Phone:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          LinkedIn:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          GitHub:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          SSRN:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Organization/Company:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox}>
        </input>
      </div>

      <div>
        <div className={globalStyles.InputFieldName}>
          Title:
        </div>
        <input style={{display: "inline-block"}} className={globalStyles.SmallTextBox}>
        </input>
      </div>

      <div className={globalStyles.mainbutton}>
        <a href="#requestdata"><button className={`${globalStyles.button} button4`}>sign up</button></a>
      </div>
      </div>
    </div>


  )
}
