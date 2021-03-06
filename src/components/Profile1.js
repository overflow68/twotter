import React,{useEffect,useState}  from 'react'
import { arrayUnion, doc, getDoc,updateDoc} from "firebase/firestore";
import { db } from '../Firebase';
import {useParams } from "react-router-dom";
import EditProfile from './EditProfile';
import '../styles/profile.css'
import { useUserAuth } from "../AuthProvider";
import FollowBtn from './FollowBtn';
import { useUserInfoAuth } from '../userInfoProvider';
import UserFeed from './UserFeed';
import {MdVerified} from 'react-icons/md'
import {getDownloadURL,ref} from 'firebase/storage'
import {storage} from '../Firebase'

function Profile() {
  let params = useParams();
  const{user} = useUserAuth()
  const{userInfo} = useUserInfoAuth()
  const[user1,setUser]=useState()
  const[pfpURL,setPfpURL] =useState()
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
            <div className='tw-pfp-cont2'><img className='tw-pfp2'  alt =""src={userInfo.pfpURL}></img>
            
            </div>
            {user.uid === params.userId?<button onClick={toggleModal} className='edit-profile'>Edit Profile</button>:<FollowBtn  params={params?params.userId:null} following ={userInfo?userInfo.ImFollowing:null}/>}
        </div>
        <div className='profile-info2'><div className='user-verif'>{user1?user1.name:null}{user1?user1.verified?<MdVerified className='verified'/>:null:null}</div></div>
        <div className='profile-info1'>{user1?user1.username:null}</div>
        <EditProfile setUser = {setUser} userId={params.userId} user={user1} toggleModal={toggleModal} showModal ={showModal}/>
        <div className='bio'>{user1?user1.bio:null}</div>
        <div className='follow-stats'>
          <div className='follow-stat'><div className='follower-count'>{user1?user1.ImFollowing.length-1:null} </div> Following</div>
          <div className='follow-stat'><div className='follower-count'>{user1?user1.MyFollowers.length-1:null}</div> Followers</div>
          </div>
          <UserFeed/>
    </div>
  )
}

export default Profile