import React, {useEffect, useState} from 'react'
import {useUserAuth} from '../AuthProvider'
import '../styles/home.css'
import {AiFillHome,AiOutlineUser} from 'react-icons/ai'
import {BiMessageAltDetail} from 'react-icons/bi'
import getWindowDimensions from '../styles/windowDimensions'
import {db} from '../Firebase'
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../Firebase";

function Home() {
  const[userInfo, setUserInfo] = useState({})
  const {user} = useUserAuth()
  const{width, height} = getWindowDimensions()
 
  useEffect(() => {
    const getUser = async()=>{ 
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserInfo(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }}
    getUser()

   },[user]);

  return (
    <div className='cont-all'>
      <div className='menu'>
        <ul>
          <li><AiFillHome></AiFillHome>{width > 1200? "Home":null}</li>
          <li><BiMessageAltDetail></BiMessageAltDetail> {width > 1200? "Messages":null}</li>
          <li><AiOutlineUser></AiOutlineUser>{width > 1200? "Profile":null}</li>
        </ul>
      </div>
      <div className='feed'>{userInfo.username}</div>
      <div className='trends'>3</div>
    </div>
  )
}

export default Home