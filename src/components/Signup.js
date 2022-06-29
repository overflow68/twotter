import React, {useState, useRef} from 'react'
import {GrTwitter} from 'react-icons/gr'
import '../styles/Login.css'
import { getDocs,doc, setDoc,collection,query,where } from "firebase/firestore";
import {db} from '../Firebase.js'
import {useUserAuth} from '../AuthProvider'
function Signup({toggle,showSign}) {
  const [isUserNameClicked, setUserNameClicked] = useState(false)
  const [isEmailClicked, setEmailClicked] = useState(false)
  const [isPassClicked, setPassClicked] = useState(false)
  const [isNameClicked, setNameClicked] = useState(false)
  const inputUserName= useRef(null);
  const inputName= useRef(null);
  const inputEmail= useRef(null);
  const inputPassword= useRef(null);
  const {signUp} = useUserAuth()

  

  const handleChange = event => {
    if (event.which !==32){
      const result = event.target.value.replace(/[^A-Z0-9]/ig, "_");

    inputUserName.current.value = result
  }
    
  };

  const usersRef = collection(db, "users");


  const focusField = () =>{
    inputUserName.current.focus()
    toggleTrue(setUserNameClicked)
  }

  const focusFieldName = () =>{
    inputName.current.focus()
    toggleTrue(setNameClicked)
  }

  const removeClicks = () =>{
    if (isUserNameClicked && inputUserName.current.value ===""){setUserNameClicked(false)}
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
    const q = query(usersRef, where("username", "==", inputUserName.current.value));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty){
      signUp(inputEmail.current.value,inputPassword.current.value).then(async(userData)=>{
        await setDoc(doc(db, "users", userData.user.uid), {
        name:inputName.current.value,
        username: "@"+inputUserName.current.value,
        bio:"",
        verified:false,
        MyFollowers: [],
        ImFollowing: [],
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
    <div onClick={focusFieldName} className={isNameClicked? "focused":"input"}>
      Nome
      <input ref={inputName} onClick={toggleTrue}  className='input1' ></input>
    </div>
    <div  onClick={focusField} className={isUserNameClicked? "focused":"input"}>
      Username
      <input maxLength={25} onKeyDown={handleChange} ref={inputUserName} onClick={toggleTrue}  className='input1' ></input>
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