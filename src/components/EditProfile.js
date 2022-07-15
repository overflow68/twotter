import React, {useState, useRef, useEffect} from 'react'
import '../styles/editProfile.css'
import { db, storage} from '../Firebase'
import { doc, updateDoc } from "firebase/firestore";
import { uploadBytes,getDownloadURL } from 'firebase/storage';
import {ref} from 'firebase/storage'



function EditProfile({setUser,userId,user,toggleModal,showModal}) {
const[bioCharacters,setBioChars] = useState(0)
const[nameCharacters,setNameChars] = useState(0)
const[isLoading, setLoading]= useState(true)


const bioChars = useRef(null)
const nameChars = useRef(null)
const pfpRef = useRef(null)



const handleChange = (e) =>{
  if ( e.target.files[0]){
    uploadImg(e.target.files[0])
  }
}

const uploadImg =async (file)=>{
  const pfpRef = ref(storage, `images/${userId}.jpg`)
  const uploadImage = async ()=>{
  await uploadBytes(pfpRef,file).then((snapshot)=>{
    console.log("uploaded")
  })
  }
  await uploadImage()
  getDownloadURL(pfpRef)
  .then((url) => {
   const userRef = doc(db,"users",userId);

   updateDoc(userRef,{
    pfpURL:url
   })

  })
  

}




useEffect(()=>{
  if (user!==undefined){
  setLoading(false)
  }
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
        <div className='input2'><input ref={pfpRef} onChange={handleChange} type= "file"></input></div>
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



