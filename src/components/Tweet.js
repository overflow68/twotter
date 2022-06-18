import React, {useState,useEffect} from 'react'
import '../styles/tweet.css'
import {FaRegComment} from 'react-icons/fa'
import {BsShare} from 'react-icons/bs'
import {AiOutlineHeart} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import {MdVerified} from 'react-icons/md'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";


function Tweet({item}) {
 const[timeElapsed,setTimeElapsed] = useState()
 const[user,setUser] = useState()
 let navigate = useNavigate();

 useEffect(()=>{
   const getUser =async()=>{
     const docRef = doc(db, "users", item.sender);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    setUser(docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
   }
  getUser()
 },[item])

 const goToProfile = ()=>{
  navigate(`/profile/${item.target[0]}`);
  /*console.log(window.location.href)*/

 }
 

 useEffect(()=>{
  var d1 = new Date().getTime();
  var diff = Math.abs(d1-item.date);
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
 },[item])
  return (
    <div className='tweet'>
      <div className='wrap-pfp-twt'>
      <div onClick={goToProfile} className='tw-pfp-cont1'><img  src='https://conteudo.imguol.com.br/c/esporte/96/2021/11/29/lionel-messi-atacante-do-psg-1638213496667_v2_4x3.jpg' className='tw-pfp' alt=""></img></div>
    <div>
      <div className='author-id'><div onClick={goToProfile} className='author-id1'>{user?user.name:null}{user?user.verified?<MdVerified className='verified'/>:null:null}</div> <div className='usernameac'> {" "+item.username}</div> <div>•</div> <div className='time-elapsed'>{timeElapsed}</div></div>
      
    </div>
    
    </div>
    <div className='actual-tweet'>{item.body}</div>
    <div className='interaction-bar'>
      <div className='bar-item bar-item1'><FaRegComment className='back-color back-color1' size={15}/>{item.comments.length}</div>
      <div className='bar-item bar-item3'><BsShare className='back-color back-color3' size={15}/>{item.shares}</div>
      <div className='bar-item bar-item2'><AiOutlineHeart className='back-color back-color2' size={15}/>{item.likes}</div>
    </div>
    </div>
  )
}

export default Tweet