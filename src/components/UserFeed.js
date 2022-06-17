import React, {useState} from 'react'
import '../styles/userFeed.css'
import Feed1 from './Feed1'

function UserFeed() {
    const[selected,setSelected] = useState(true)

    const toggleOption = (e)=>{
        if(e.target.className.includes("feed-liked")){
        setSelected(false)
    }else{
        setSelected(true)
    }
    }
  return (
    <div className='user-feed'>
        <div className='options-feed'>
            <div onClick={toggleOption} className={selected?"feed-tweets feed-option selected-option":"feed-tweets feed-option"}>
                Tweets
                
                </div>
            <div onClick={toggleOption} className={!selected?"feed-liked feed-option selected-option":"feed-liked feed-option"}>
                Liked</div>
            
        </div>
        <div className={selected?"blue-bar-left":"blue-bar-right"}></div>
        {selected?<Feed1/>:null}
    </div>
  )
}

export default UserFeed