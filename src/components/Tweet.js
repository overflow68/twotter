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
import Comment from './Comment'
import Reply from './Reply'
import {BsDot} from 'react-icons/bs'


function Tweet({addCommentInfo,likedPosts,item}) { 
  const checkIfLiked = ()=>{
  if (likedPosts.includes(item.id)){
    return true
  }else return false
 } 
 const[likes,setLikes] = useState(0)
 const[liked,setLiked] = useState(false)
 const[user1,setUser] = useState("")
 const[showComments,setShowComments] = useState(false)
 const{user} = useUserAuth() 
 let navigate = useNavigate();

 const toggleComments = ()=>{
  setShowComments(!showComments)
 }

 const removeLike = async()=>{
  setLiked(false)
setLikes(likes-1)
  const userRef = doc(db, "users", user.uid);

await updateDoc(userRef, {
  likedPosts: arrayRemove(item.id)
});
const tweetRef = doc(db, "Twoots", item.id);

await updateDoc(tweetRef, {
  likes: increment(-1)
});

 }

 const like = async()=>{
  setLiked(true)
setLikes(likes+1)
  const userRef = doc(db, "users", user.uid);

await updateDoc(userRef, {
  likedPosts: arrayUnion(item.id)
});
const tweetRef = doc(db, "Twoots", item.id);

await updateDoc(tweetRef, {
  likes: increment(1)
});

 }



 useEffect(()=>{
  if (user1===""){
   const getUser =async()=>{
     const docRef = doc(db, "users", item.sender);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    setUser(docSnap.data());
  } else {
    
  }
   }
  getUser()}
  const checkIfLiked = ()=>{
    if (likedPosts.includes(item.id)){
      return true
    }else return false
   } 
   setLiked(checkIfLiked)
   setLikes(item.likes)
   
 },[item,likedPosts,user1])

 const goToProfile = ()=>{
  navigate(`/profile/${item.target[0]}`);
  /*console.log(window.location.href)*/

 }
 

 const tweetAge =()=>{
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
 
return converse(diff)
 }
  return (
    <div className='tweet'>
      <div className='wrap-pfp-twt'>
      <div onClick={goToProfile} className='tw-pfp-cont1'><img  src={item.pfpURL} className='tw-pfp' alt=""></img></div>
    <div>
      <div className='author-id'><div onClick={goToProfile} className='author-id1'>{user1?user1.name:null}{user1?user1.verified?<MdVerified className='verified'/>:null:null}</div> <div className='usernameac'> {" "+item.username}</div> <div><BsDot color="rgb(145, 145, 145)"/></div> <div className='time-elapsed'>{tweetAge()}</div></div>
      
    </div>
    
    </div>
    <div className='actual-tweet'>{item.body}</div>
    <div className='interaction-bar'>
      <div className='bar-item bar-item1'><FaRegComment onClick={toggleComments} className='back-color back-color1' size={15}/>{item.comments.length}</div>
      <div className='bar-item bar-item3'><BsShare className='back-color back-color3' size={15}/>{item.shares}</div>
      <div className='bar-item bar-item2'>{liked?<AiFillHeart onClick={removeLike} className='back-color liked-color back-color2' size={15}/>:<AiOutlineHeart onClick={like} className='back-color back-color2' size={15}/>}{likes}</div>
    </div>
    <div className={showComments?"comments-cont":"comments-cont-hide"}>
    <Reply commenterInfo={addCommentInfo} tweetId={item.id}/>
    {item.comments.map(comment=>{return <Comment data={comment}/>})}
    </div>
    </div>
  )
}

export default Tweet