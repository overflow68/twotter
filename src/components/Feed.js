import React, { useState, useEffect } from "react";
import Tweet from "./Tweet";
import CreateTweet from "./CreateTweet";
import { onSnapshot,collection,where, query, orderBy, getDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import {useUserInfoAuth} from '../userInfoProvider'


function Feed({showProfile}) {
  const{user,userInfo} = useUserInfoAuth()
  const [tweets, setTweets] = useState([]);
  const [isLoading,setLoading] = useState(true)
  

  useEffect(()=>{
    if(userInfo.posts !== undefined && user!==undefined){
      setLoading(false)
    }
  },[isLoading,user,userInfo])

  


  useEffect(() => {
    
    if (!isLoading) {
      
        const q = query(collection(db, "Twoots"),where("target","array-contains-any",userInfo.follows),orderBy("date","asc"));
        const unsub = onSnapshot(q, (querySnapshot) => {
          const twts = [];
          
          querySnapshot.forEach((doc) => {

              twts.push(doc.data());
             
              
          });
          twts.reverse()
          setTweets(twts)
          
        });
        
      
    }
  }, [isLoading]);

  return (
    <div>
      <CreateTweet username={userInfo.username} name={userInfo.name} followers={userInfo.follows} />
      {!isLoading?tweets.map((item) => {
        return <Tweet showProfile={showProfile} item={item} />;
      }):<div>stuff's loading</div>}
    </div>
  );
}

export default Feed;




