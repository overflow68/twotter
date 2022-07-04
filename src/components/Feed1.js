import React, { useState, useEffect } from "react";
import Tweet from "./Tweet";
import { onSnapshot,collection,where, query, orderBy,getDocs} from "firebase/firestore";
import { db } from "../Firebase";
import {useUserInfoAuth} from '../userInfoProvider'
import {useParams} from 'react-router-dom'


function Feed() {
  const{user,userInfo} = useUserInfoAuth()
  const [tweets, setTweets] = useState([]);
  const [isLoading,setLoading] = useState(true)
  let params = useParams();
  

  useEffect(()=>{
    if(userInfo.posts !== undefined && user!==undefined){
      setLoading(false)
    }
  },[isLoading,user,userInfo])

  


  useEffect(() => {
    const getTweets = async()=>{
      const q = query(collection(db, "Twoots"),where("sender","==",params.userId),orderBy("date","asc"));
      const querySnapshot = await getDocs(q);
      const twts = [];
querySnapshot.forEach((doc) => {
  twts.push(doc.data())
});
setTweets(twts)
    }
    if (!isLoading) {
        
      getTweets()
      
    }
  }, [isLoading,params]);

  return (
    <div className="users-posts">
      {!isLoading?tweets.map((item) => {
        return <Tweet likedPosts={userInfo.likedPosts} item={item} />;
      }):<div>loading</div>}
    </div>
  );
}

export default Feed;
