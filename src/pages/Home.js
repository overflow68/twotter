import React, {useState} from 'react'
import { useUserInfoAuth } from '../userInfoProvider'
import '../styles/home.css'
import {GrTwitter} from 'react-icons/gr'
import {AiFillHome,AiOutlineUser} from 'react-icons/ai'
import {BiMessageAltDetail} from 'react-icons/bi'
import Feed from '../components/Feed'
import { IconContext } from "react-icons";
import SessionInfo from '../components/SessionInfo'
import useWindowDimensions from '../styles/windowDimensions'
import { useNavigate } from "react-router-dom";
import {
  Outlet
} from "react-router-dom";


function Home() {
  const{userInfo} = useUserInfoAuth()
  const{width} = useWindowDimensions()
  const[displayProfile,setDisplayProfile] = useState(false)
  const navigate = useNavigate()
  const goHome = ()=>{
    navigate('/home')
    setDisplayProfile(false)
  }
  

  return (
    <div className='cont-all'>
      <div className='menu'>
      <IconContext.Provider value={{className:"react-icons"}}>
        <ul>
          <li className='menu-option'><GrTwitter  color='rgb(14, 147, 255)' size={30}/></li>
          <li onClick={goHome} className='menu-option'><div className='hover-wrap'><AiFillHome size={23} ></AiFillHome>{width > 1200? "Home":null}</div></li>
          <li className='menu-option'><div className='hover-wrap'><BiMessageAltDetail size={23}></BiMessageAltDetail>{width > 1200? "Messages":null}</div></li>
          <li className='menu-option'><div className='hover-wrap'><AiOutlineUser size={23}></AiOutlineUser>{width> 1200? "Profile":null}</div></li>
        </ul>
        </IconContext.Provider>
        <SessionInfo user ={userInfo}/>
      </div>
      <div className='feed'>
        {!displayProfile?<Feed showProfile={setDisplayProfile}/>:<Outlet/>}
        
      
      </div>
      
      <div className='trends'>3</div>
    </div>
  )
}

export default Home