import React,{useEffect,useState} from 'react'
import { doc, updateDoc,arrayUnion,arrayRemove } from "firebase/firestore";
import {db} from '../Firebase'
import { useUserAuth } from '../AuthProvider';
import '../styles/followBtn.css'

function FollowBtn({params,following}) {
  const[btnText,setText] = useState(true);
  const{user} = useUserAuth()
  const follow = async()=>{
    const myRef = doc(db, "users",user.uid);
    const theGuyIFollow = doc(db,"users",params)

    await updateDoc(theGuyIFollow, {
      MyFollowers: arrayUnion(user.uid)
    });
await updateDoc(myRef, {
  ImFollowing: arrayUnion(params)
});
  }

  const unfollow = async()=>{
    const myRef = doc(db, "users",user.uid);
    const theGuyIFollow = doc(db,"users",params)
  
    await updateDoc(theGuyIFollow, {
      MyFollowers: arrayRemove(user.uid)
    });
await updateDoc(myRef, {
  ImFollowing: arrayRemove(params)
});

  }



 
    const toggleText = ()=>{
        setText(!btnText)
        console.log(following)
    }

  return (
    <div>
        {following?
        following.includes(params)?
        <button onClick={unfollow} onMouseLeave={toggleText} onMouseOver={toggleText} className='following'>{btnText?"Following":"Unfollow"}</button>:
        <button onClick={follow}  className='follow'>Follow</button>:null}
        </div>
  )
}

export default FollowBtn