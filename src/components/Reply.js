import React,{useState} from 'react'
import '../styles/reply.css'
import { doc, getDoc, updateDoc,arrayUnion,arrayRemove, increment, decrement } from "firebase/firestore";
import { db } from "../Firebase";
function Reply({commenterInfo,tweetId}) {
    const [tweet, setTweet] = useState("");
    const updateTwState = (e) => {
        setTweet(e.target.value);
      };

      const addComment = async()=>{
        let commentObj = {
        body: tweet,
        username: commenterInfo.username,
        name: commenterInfo.name,
        verified: commenterInfo.verified,
        date: new Date().getTime(),
        
        }
        const tweetRef = doc(db, "Twoots", tweetId);

// Set the "capital" field of the city 'DC'
await updateDoc(tweetRef, {
  comments: arrayUnion(commentObj)
});
      }
  return (
    <div className='reply12'>
        <div className="info-cont">
          <div className="tw-pfp-cont">
            <img
              src="https://conteudo.imguol.com.br/c/esporte/96/2021/11/29/lionel-messi-atacante-do-psg-1638213496667_v2_4x3.jpg"
              className="tw-pfp"
              alt=""
            ></img>
          </div>
          <textarea
            value={tweet}
            onChange={updateTwState}
            maxLength={280}
            data-min-rows="2"
            className="tw-input autoExpand"
            placeholder="Tweet your reply"
          ></textarea>
        </div>
        <div className='btn-cont'><button onClick={addComment} className="submit-tw12">
            Tweet
          </button></div>
        
    </div>
  )
}

export default Reply