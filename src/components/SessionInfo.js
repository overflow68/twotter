import React, {useState,} from 'react'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import '../styles/SessionInfo.css'
import OutsideAlerter from '../hooks/OutsideAlerter'
import {useUserAuth} from '../AuthProvider.js'


function SessionInfo({user}) {
    const[showDropdown,setShowDropdown] = useState(false);
    const{logOut} = useUserAuth()
 

    const handleClick = () =>{
        setShowDropdown(!showDropdown)
    }
    
  return (
      <div className='session-cont'>
    <div className='session-info'>
        <div className='tw-pfp-cont1'><img onClick={handleClick} src='https://conteudo.imguol.com.br/c/esporte/96/2021/11/29/lionel-messi-atacante-do-psg-1638213496667_v2_4x3.jpg' className='tw-pfp' alt=""></img></div>
    <div className='click-username'>{user.username}</div><div className='dots'><BiDotsHorizontalRounded onClick={handleClick} size={25}/></div>
    
    </div>
    <OutsideAlerter setD={setShowDropdown} dropdown = {showDropdown}>
    {showDropdown? <div  onClick={logOut} className='logout-btn'>Logout {user.username}</div>:null}
    </OutsideAlerter>
    </div>
  )
}

export default SessionInfo