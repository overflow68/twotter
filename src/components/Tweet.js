import React, {useState,useEffect} from 'react'
import '../styles/tweet.css'
import {FaRegComment} from 'react-icons/fa'
import {BsShare} from 'react-icons/bs'
import {AiOutlineHeart} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";


function Tweet(props) {
 const[timeElapsed,setTimeElapsed] = useState()
 let navigate = useNavigate();

 const goToProfile = ()=>{
  navigate(`/home/${props.item.target[0]}`);
  props.showProfile(true)
 }
 

 useEffect(()=>{
  var d1 = new Date().getTime();
  var diff = Math.abs(d1-props.item.date);
  const converse = (milliseconds)=>{
    let seconds = milliseconds/1000;
    let minutes = seconds/60;
    let hours = minutes/60;
    let days = hours/24;
    let years = days/365;
    if (seconds <60){
      return seconds.toFixed(0)+"s"
    }else if(minutes<60){
      return minutes.toFixed(0)+"m"
    }else if(hours<24){
      return hours.toFixed(0)+"h"
    }else if(days <365) {
      return days.toFixed(0)+"d"
    }else return years.toFixed(0)+"y"


  
 }
 
setTimeElapsed(converse(diff))
 },[props])
  return (
    <div className='tweet'>
      <div className='wrap-pfp-twt'>
      <div onClick={goToProfile} className='tw-pfp-cont1'><img  src='https://conteudo.imguol.com.br/c/esporte/96/2021/11/29/lionel-messi-atacante-do-psg-1638213496667_v2_4x3.jpg' className='tw-pfp' alt=""></img></div>
    <div>
      <div className='author-id'><div className='author-id1'>{props.item.name}</div> <div className='usernameac'> {" "+props.item.username}</div> <div>•</div> <div className='time-elapsed'>{timeElapsed}</div></div>
      <div className='actual-tweet'>{props.item.body}</div>
    </div>
    
    </div>
    <div className='interaction-bar'>
      <div className='bar-item bar-item1'><FaRegComment className='back-color back-color1' size={15}/>{props.item.comments.length}</div>
      <div className='bar-item bar-item3'><BsShare className='back-color back-color3' size={15}/>{props.item.shares}</div>
      <div className='bar-item bar-item2'><AiOutlineHeart className='back-color back-color2' size={15}/>{props.item.likes}</div>
    </div>
    </div>
  )
}

export default Tweet