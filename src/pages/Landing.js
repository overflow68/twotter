import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom";

import "../styles/Landing.css"
import bg_img from "../images/bg.png"
import {GrTwitter} from 'react-icons/gr'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { useUserAuth } from '../AuthProvider';

function Landing() {
  const[showLogin,setShowLogin] = useState(false)
  const[showSignup,setShowSignup] = useState(false)
  const {user} = useUserAuth()

  useEffect(() => {
   if (user){
     navigateTo()
   }
  });

  const navigate = useNavigate();
  
  const navigateTo = ()=>{
    navigate('/home')
  }

  const toggleLoginBtn = () =>{
setShowLogin(!showLogin)
  }
  const toggleSignupBtn = () =>{
    setShowSignup(!showSignup)
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
          <div onClick={toggleSignupBtn} className='go-register'><div className='custom-btn-text'>Inscreva-se com o seu e-mail</div></div>
          <div className='open-login'>Já tem conta?</div>
          <div className='go-login' onClick={toggleLoginBtn}><div className='custom-btn-text1'>Login</div></div>
          
          
        </div>

      </div>
    <Login toggle={toggleLoginBtn} showLogin={showLogin}/>
<Signup toggle={toggleSignupBtn} showSign={showSignup}/>
    </div>
  )
}

export default Landing

/*<form className='login-form'>
<label>E-mail:</label>
<input></input>
<label>Palavra-passe:</label>
<input type="password"></input>

</form>*/