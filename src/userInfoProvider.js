import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth } from "./AuthProvider";
import { arrayUnion, doc, getDoc,updateDoc, onSnapshot } from "firebase/firestore";
import {auth} from "./Firebase";
import {db} from './Firebase'

const userInfoContext = createContext();

export function UserInfoContextProvider({ children }) {
    const[userInfo, setUserInfo] = useState({})
    const {user} = useUserAuth()
    const[isLoading,setLoading] = useState(true)

    useEffect(()=>{
        if(userInfo.posts !== undefined  && user!==undefined){
          setLoading(false)
        }
      },[isLoading,userInfo,user])
    
      useEffect(() => {
        if (!isLoading){
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
          setUserInfo(doc.data())
        
      })}
    },[isLoading]);
    useEffect(() => {
   
        const getUser = async()=>{ 
          const docRef = doc(db, "users", auth.currentUser.uid);
    
          const addToFollow = async ()=> {
            await updateDoc(docRef, {
              ImFollowing:arrayUnion(auth.currentUser.uid),
              MyFollowers:arrayUnion(auth.currentUser.uid)
            });
            const docSnap = await getDoc(docRef);
            
            setUserInfo(docSnap.data())
          }
          const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          
          if(docSnap.data().ImFollowing.length <1){
            addToFollow()
            
          }else{
           
            setUserInfo(docSnap.data())
          }
          
          
        } else {
          // doc.data() will be undefined in this case
        }}
        getUser()
       },[user]);

  
  return (
    <userInfoContext.Provider
      value={{ userInfo,user }}
    >
      {children}
    </userInfoContext.Provider>
  );
}

export function useUserInfoAuth() {
  return useContext(userInfoContext);
}