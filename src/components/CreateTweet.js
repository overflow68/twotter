import React, {useState} from 'react'
import Picker from 'emoji-picker-react';
import {BsEmojiSmile} from 'react-icons/bs'
import {IconContext} from 'react-icons'
import {AiOutlinePicture} from 'react-icons/ai'
import {db} from '../Firebase.js'
import { doc,updateDoc, setDoc,arrayUnion, serverTimestamp } from "firebase/firestore";
import uniqid from 'uniqid';
import {useUserAuth} from '../AuthProvider'
import OutsideAlerter from '../hooks/OutsideAlerter'


function CreateTweet({username, followers, name}) {
  const[showDropdown,setShowDropdown] = useState(false);
  const[tweet, setTweet] = useState("")
  const {user} = useUserAuth()
  //Add tweet to database {
  const addTweet = async () =>{
   
    if (tweet.length > 4) {
    let id = uniqid()
    await setDoc(doc(db, "Twoots", id), {
      body: tweet,
      username:username,
      name:name,
      date:new Date().getTime(),
      target:[...followers],
      likes:0,
      shares:0,
      comments:[]
    });
    const userRef = doc(db, "users", user.uid);


await updateDoc(userRef, {
  posts: arrayUnion(id)
});
}else{
  alert("your twoot is too short!")
}
setTweet("")
  }
//Add tweet to database }

  //Emoji board {
  

  const pickEmoji = (event,emojiObj)=>{
    setTweet(prevState => prevState+=emojiObj.emoji)
  }

  const toggleEmojis = ()=>{
    setShowDropdown(!showDropdown)
  }

   const updateTwState= (e) =>{
     setTweet(e.target.value)
   }
   //Emoji board }

   //Change textbox size accordingly {
  function getScrollHeight(elm){
    var savedValue = elm.value
    elm.value = ''
    elm._baseScrollHeight = elm.scrollHeight
    elm.value = savedValue
  }
  
  function onExpandableTextareaInput({ target:elm }){
    if( !elm.classList.contains('autoExpand') || !elm.nodeName === 'TEXTAREA' ) return
    
    var minRows = elm.getAttribute('data-min-rows')|0, rows;
    !elm._baseScrollHeight && getScrollHeight(elm)
  
    elm.rows = minRows
    rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16)
    elm.rows = minRows + rows
  }
  
  document.addEventListener('input', onExpandableTextareaInput)
 //Change textbox size accordingly }
  return (
    
        <div className='new-tweet'>
          <IconContext.Provider value={{color:"rgb(14, 147, 255)",style:{margin:"4px"}}}>
            <div className='info-cont'>
                <div className='tw-pfp-cont'><img src='https://conteudo.imguol.com.br/c/esporte/96/2021/11/29/lionel-messi-atacante-do-psg-1638213496667_v2_4x3.jpg' className='tw-pfp' alt=""></img></div>
           <textarea value={tweet} onChange={updateTwState} maxLength={280} data-min-rows='2' className='tw-input autoExpand' placeholder='O que tens em mente?'></textarea>
            </div>
            <div className='tw-options-cont'>
              <div className='tw-adds-cont'><BsEmojiSmile onClick={toggleEmojis}/><AiOutlinePicture/></div>
              <button onClick={addTweet} className='submit-tw'>Twoot</button>
            </div>
            <OutsideAlerter setD={setShowDropdown}>
            {showDropdown? <Picker onEmojiClick={pickEmoji}/>:null}
            </OutsideAlerter>
</IconContext.Provider>
    </div>
  )
}

export default CreateTweet