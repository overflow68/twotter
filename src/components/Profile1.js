import React,{useEffect,useState}  from 'react'
import { arrayUnion, doc, getDoc,updateDoc} from "firebase/firestore";
import { db } from '../Firebase';
import {useParams } from "react-router-dom";
import EditProfile from './EditProfile';
import '../styles/profile.css'
import { useUserAuth } from "../AuthProvider";
import FollowBtn from './FollowBtn';
import { useUserInfoAuth } from '../userInfoProvider';

function Profile() {
  let params = useParams();
  const{user} = useUserAuth()
  const{userInfo} = useUserInfoAuth()
  const[user1,setUser]=useState()
  const [isLoading,setLoading] = useState(true)
  const [showModal,setShowModal] = useState(false)
  const toggleModal = () =>{
setShowModal(!showModal)
  }
  useEffect(() => {
   
    const getUser = async()=>{ 
      const docRef = doc(db, "users", params.userId);

      
      const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) { 
        setUser(docSnap.data())
      }
    
   }
   getUser()
  },[params]);


  return (
    <div className='profile'>
        <div className='profile-info'>
            <div className='cover-pic-cont'>
                <img className='cover-pic' alt="" src="https://149369349.v2.pressablecdn.com/wp-content/uploads/2012/10/twitter-cover.jpg"/>
            </div>
            <div className='tw-pfp-cont2'><img className='tw-pfp2'  alt =""src='https://conteudo.imguol.com.br/c/esporte/96/2021/11/29/lionel-messi-atacante-do-psg-1638213496667_v2_4x3.jpg'></img>
            
            </div>
            {user.uid === params.userId?<button onClick={toggleModal} className='edit-profile'>Edit Profile</button>:<FollowBtn params={params?params.userId:null} following ={userInfo?userInfo.ImFollowing:null}/>}
        </div>
        <div className='profile-info2'>{user1?user1.name:null}</div>
        <div className='profile-info1'>{user1?user1.username:null}</div>
        <EditProfile userId={params.userId} user={user1} toggleModal={toggleModal} showModal ={showModal}/>
        <div className='bio'>{user1?user1.bio:null}</div>
        <div className='follow-stats'>
          <div className='follow-stat'><div className='follower-count'>{user1?user1.ImFollowing.length-1:null} </div> Following</div>
          <div className='follow-stat'><div className='follower-count'>{user1?user1.MyFollowers.length-1:null}</div> Followers</div>
          </div>
    </div>
  )
}

export default Profile