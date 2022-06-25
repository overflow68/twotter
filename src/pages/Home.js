import React, {useState} from 'react'
import { useUserInfoAuth } from '../userInfoProvider'
import { useUserAuth } from '../AuthProvider'
import '../styles/home.css'
import {GrTwitter} from 'react-icons/gr'
import {AiFillHome,AiOutlineUser} from 'react-icons/ai'
import {BiMessageAltDetail} from 'react-icons/bi'
import Feed from '../components/Feed'
import { IconContext } from "react-icons";
import SessionInfo from '../components/SessionInfo'
import useWindowDimensions from '../styles/windowDimensions'
import { useNavigate } from "react-router-dom";
import Trends from '../components/Trends'



function Home() {
  const{userInfo} = useUserInfoAuth()
  const {user} = useUserAuth()
  const{width} = useWindowDimensions()
  
  const navigate = useNavigate()
  const goToProfile = ()=>{
    navigate(`/profile/${user.uid}`);
    /*console.log(window.location.href)*/
  
   }
  const goHome = ()=>{
    navigate('/home')
    
  }
  

  return (
    <div className='cont-all'>
      <div className='menu'>
      <IconContext.Provider value={{className:"react-icons"}}>
        <ul>
          <li className='menu-option'><GrTwitter  color='rgb(14, 147, 255)' size={30}/></li>
          <li onClick={goHome} className='menu-option'><div className='hover-wrap'><AiFillHome size={23} ></AiFillHome>{width > 1200? "Home":null}</div></li>
          <li className='menu-option'><div className='hover-wrap'><BiMessageAltDetail size={23}></BiMessageAltDetail>{width > 1200? "Messages":null}</div></li>
          <li onClick={goToProfile} className='menu-option'><div className='hover-wrap'><AiOutlineUser size={23}></AiOutlineUser>{width> 1200? "Profile":null}</div></li>
        </ul>
        </IconContext.Provider>
        <SessionInfo user ={userInfo}/>
      </div>
      <div className='feed'>
        <Feed/>
        
      
      </div>
      
      <div className='trends'>
        <Trends/>
      </div>
    </div>
  )
}

export default Home