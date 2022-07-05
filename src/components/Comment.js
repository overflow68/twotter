import React, {useState,useEffect} from 'react'
import '../styles/tweet.css'
import {FaRegComment} from 'react-icons/fa'
import {BsShare} from 'react-icons/bs'
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import {MdVerified} from 'react-icons/md'
import { doc, getDoc, updateDoc,arrayUnion,arrayRemove, increment, decrement } from "firebase/firestore";
import { db } from "../Firebase";
import { useUserAuth } from "../AuthProvider";
import "../styles/reply.css"
import {BsDot} from 'react-icons/bs'


function Comment({data}) { 

 
 const[user1,setUser] = useState()
 const[showComments,setShowComments] = useState(false)
 const{user} = useUserAuth() 
 let navigate = useNavigate();

 /*const goToProfile = ()=>{
  navigate(`/profile/${item.target[0]}`);
  console.log(window.location.href)

 }*/
 

 const tweetAge =()=>{
  var d1 = new Date().getTime();
  var diff = Math.abs(d1-data.date);
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
 
return converse(diff)
 }
  return (
    <div className='tweet-reply'>
      <div className='wrap-pfp-twt'>
      <div  className='tw-pfp-cont1'><img  src='https://conteudo.imguol.com.br/c/esporte/96/2021/11/29/lionel-messi-atacante-do-psg-1638213496667_v2_4x3.jpg' className='tw-pfp' alt=""></img></div>
    <div>
      <div className='author-id'><div  className='author-id1'>{data.name}</div> <div className='usernameac'>{data.username}</div> <div><BsDot color="rgb(145, 145, 145)"/></div> <div className='time-elapsed'>{tweetAge()}</div></div>
      
    </div>
    
    </div>
    <div className='actual-tweet'>{data.body}</div>
   
    
    </div>
  )
}

export default Comment