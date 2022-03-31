import React, {useState, useRef} from 'react'
import {GrTwitter} from 'react-icons/gr'
import '../styles/Login.css'
import { getDocs,doc, setDoc,collection,query,where } from "firebase/firestore";
import {db} from '../Firebase.js'
import {useUserAuth} from '../AuthProvider'
function Signup({toggle,showSign}) {
  const [isNameClicked, setNameClicked] = useState(false)
  const [isEmailClicked, setEmailClicked] = useState(false)
  const [isPassClicked, setPassClicked] = useState(false)
  const inputName= useRef(null);
  const inputEmail= useRef(null);
  const inputPassword= useRef(null);
  const {signUp, user} = useUserAuth()

  const usersRef = collection(db, "users");


  const focusField = () =>{
    inputName.current.focus()
    toggleTrue(setNameClicked)
  }

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
    const q = query(usersRef, where("username", "==", inputName.current.value));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty){
      signUp(inputEmail.current.value,inputPassword.current.value).then(async(userData)=>{
        console.log(userData.user.uid)
        await setDoc(doc(db, "users", userData.user.uid), {
        username: inputName.current.value,
        follows: [],
        following: [],
        posts:[]
      });
      })
      
    }
  }


  return (
    <div onClick={removeClicks} id="myModal" className={showSign ? "modal-open":"modal-closed"}>
    <div className="modal-content">
    <span onClick={toggle} className="close">&times;</span>
    <div className='centerLogo'><GrTwitter className='centerLogo' color='rgb(14, 147, 255)' size={30}/></div>
    <h1>Criar a sua conta</h1>
    <div onClick={focusField} className={isNameClicked? "focused":"input"}>
      Nome
      <input ref={inputName} onClick={toggleTrue}  className='input1' ></input>
    </div>
    <div onClick={focusFieldEmail} className={isEmailClicked? "focused":"input"}>
      E-mail
      <input ref={inputEmail} onClick={setEmailClicked}  className='input1' ></input>
    </div>
    <div onClick={focusFieldPass} className={isPassClicked? "focused":"input"}>
      Password
      <input type={"password"} ref={inputPassword} onClick={setPassClicked}  className='input1' ></input>
    </div>
    <div onClick={handleSubmit} className='createAcc'><button className='createAccBtn'>Create account</button></div>
    </div>
    
    </div>
  )
}

export default Signup