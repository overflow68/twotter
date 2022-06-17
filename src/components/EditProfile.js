import React, {useState, useRef, useEffect} from 'react'
import '../styles/editProfile.css'
import { db } from '../Firebase'
import { doc, updateDoc } from "firebase/firestore";


function EditProfile({setUser,userId,user,toggleModal,showModal}) {
const[bioCharacters,setBioChars] = useState(0)
const[nameCharacters,setNameChars] = useState(0)
const[isLoading, setLoading]= useState(true)

const bioChars = useRef(null)
const nameChars = useRef(null)

useEffect(()=>{
  if (user!==undefined){
  setLoading(false)
  console.log("user: ",user)}
},[user])

useEffect(()=>{
  if(!isLoading){
  nameChars.current.value = user.name
  bioChars.current.value =  user.bio
  setNameChars(nameChars.current.value.length)
  setBioChars(bioChars.current.value.length)
}
  
},[isLoading])

const saveChanges = async() =>{
  const userRef = doc(db, "users", userId);

// Set the "capital" field of the city 'DC'
await updateDoc(userRef, {
  bio:bioChars.current.value,
  name:nameChars.current.value
});
setUser(prevState => ({
  ...prevState,
  bio:bioChars.current.value,
  name:nameChars.current.value
}));
toggleModal()
}


const updateNameChars = ()=>{
  setNameChars(nameChars.current.value.length)
}

const updateBioChars = ()=>{
  setBioChars(bioChars.current.value.length)
}

  return (
    <div  id="myModal" className={showModal ? "modal-open":"modal-closed"}>
    <div className="modal-content1">
        <div className='edit-header'>
            <span onClick={toggleModal} className="close">&times;</span>
            <div>Edit Profile</div>
            <button className='save' onClick={saveChanges}>Save</button>
            
        </div>
        <div className="input2">
      <div className='pointers'>
        <div className='some-cont'><div className='label-name'>Name</div></div>
        <div className='some-cont1' ><div className='characters'>{nameCharacters}/50</div></div>
        </div>
      <input maxLength={50} onChange={updateNameChars} ref={nameChars} className='input3' ></input>
      
    </div>
    <div className="input4">
    <div className='pointers'>
        <div className='some-cont'><div className='label-name'>Bio</div></div>
        <div className='some-cont1' ><div className='characters'>{bioCharacters}/160</div></div>
        </div>
      <textarea ref={bioChars} onChange={updateBioChars} maxLength={160}  className='tw-input1'></textarea>
      
    </div>
    </div>
    
    </div>
  )
}

export default EditProfile



