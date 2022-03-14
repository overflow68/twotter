import React, {useState} from 'react'
import "../styles/login.css"
import bg_img from "../images/bg.png"
import {GrTwitter} from 'react-icons/gr'

function Login() {
  const[showLogin,setShowLogin] = useState(false)

  const toggleLoginBtn = () =>{
setShowLogin(!showLogin)
  }
  return (
    <div className='login-page'>
 
      <div className='container'>
        <div className='img-cont'>
          <img alt="" className='bg-img' src={bg_img}></img>
          </div>
        <div className='login'>
          <GrTwitter className='logo1' color='rgb(14, 147, 255)' size={70}/>
          <div className='login-title'>Acontecendo agora</div>
          <div className='subtitle'>Inscreva-se no Twitter hoje mesmo.</div>
          <div className='go-register'><div className='custom-btn-text'>Inscreva-se com o seu e-mail</div></div>
          <div className='open-login'>Já tem conta?</div>
          <div className='go-login' onClick={toggleLoginBtn}><div className='custom-btn-text1'>Login</div></div>
          
          
        </div>

      </div>
     <div id="myModal" onClick={toggleLoginBtn} class={showLogin ? "modal-open":"modal-closed"}>
<div class="modal-content">
  <span onClick={toggleLoginBtn} class="close">&times;</span>
  <p>Some text in the Modal..</p>
</div>

</div>
    </div>
  )
}

export default Login

/*<form className='login-form'>
<label>E-mail:</label>
<input></input>
<label>Palavra-passe:</label>
<input type="password"></input>

</form>*/