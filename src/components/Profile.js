import React,{useEffect,useState}  from 'react'
import { arrayUnion, doc, getDoc,updateDoc} from "firebase/firestore";
import { db } from '../Firebase';
import {useParams } from "react-router-dom";
import EditProfile from './EditProfile';
import '../styles/profile.css'

function Profile() {
  let params = useParams();
  const[user,setUser]=useState()
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
    <div>
        <div className='profile-info'>
            <div className='cover-pic-cont'>
                <img className='cover-pic' alt="" src="https://149369349.v2.pressablecdn.com/wp-content/uploads/2012/10/twitter-cover.jpg"/>
            </div>
            <div className='tw-pfp-cont2'><img className='tw-pfp2'  alt =""src='https://conteudo.imguol.com.br/c/esporte/96/2021/11/29/lionel-messi-atacante-do-psg-1638213496667_v2_4x3.jpg'></img>
            
            </div>
            <button onClick={toggleModal} className='edit-profile'>Edit Profile</button>
        </div>
        <div className='profile-info2'>{user?user.username:null}</div>
        <EditProfile user={user} toggleModal={toggleModal} showModal ={showModal}/>
    </div>
  )
}

export default Profile