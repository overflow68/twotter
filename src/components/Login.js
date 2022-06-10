import React, {useState, useRef} from 'react'
import {GrTwitter} from 'react-icons/gr'
import '../styles/Login.css'

import {useUserAuth} from '../AuthProvider'
function Login({toggle,showLogin}) {
  const [isNameClicked, setNameClicked] = useState(false)
  const [isEmailClicked, setEmailClicked] = useState(false)
  const [isPassClicked, setPassClicked] = useState(false)
  const{logIn} = useUserAuth()
  const inputName= useRef(null);
  const inputEmail= useRef(null);
  const inputPassword= useRef(null);
 

  




  const removeClicks = () =>{
    if (isNameClicked && inputName.current.value ===""){setNameClicked(false)}
    if (isEmailClicked && inputEmail.current.value ===""){setEmailClicked(false)}
    if (isPassClicked && inputPassword.current.value ===""){setPassClicked(false)}
  }

  const focusFieldEmail= () =>{
    inputEmail.current.focus()
    toggleTrue(setEmailClicked)
  }
  const focusFieldPass= () =>{
    inputPassword.current.focus()
    toggleTrue(setPassClicked)
  }

  const toggleTrue = (fun) =>{
    fun(true)
  }

  const handleSubmit = async () =>{
    logIn(inputEmail.current.value,inputPassword.current.value)
  }


  return (
    <div onClick={removeClicks} id="myModal" className={showLogin ? "modal-open":"modal-closed"}>
    <div className="modal-content">
    <span onClick={toggle} className="close">&times;</span>
    <div className='centerLogo'><GrTwitter className='centerLogo' color='rgb(14, 147, 255)' size={30}/></div>
    <h1>Login</h1>
    <div onClick={focusFieldEmail} className={isEmailClicked? "focused":"input"}>
      E-mail
      <input ref={inputEmail} onClick={setEmailClicked}  className='input1' ></input>
    </div>
    <div onClick={focusFieldPass} className={isPassClicked? "focused":"input"}>
      Password
      <input type={"password"} ref={inputPassword} onClick={setPassClicked}  className='input1' ></input>
    </div>
    <div onClick={handleSubmit} className='createAcc'><button className='createAccBtn'>Login</button></div>
    </div>
    
    </div>
  )
}

export default Login