import React, {useState, useRef} from 'react'
import '../styles/trends.css'
import {FiSearch} from 'react-icons/fi'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../Firebase';
import SearchResult from './SearchResult';
import OutsideAlerter from '../hooks/OutsideAlerter';

function Trends() {
    const[showResults,setShowResults] = useState(false)
    const [results,setResults] = useState([])

    let inputRef = useRef(null)
    
    const toggleFocus = ()=>{
        setShowResults(true)
    }
    const toggleFalse = ()=>{
        setShowResults(false)
    }

    const getResults = async()=>{
        console.log(results)
        const q = query(collection(db, "users"), where("name", "==", inputRef.current.value));
        const resultsCopy = []

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  resultsCopy.push(doc.data())
});
setResults(resultsCopy)
    }

  return (
    <div>
        <OutsideAlerter setD={toggleFalse}>
        <div>
        <div className='search-bar'>
            <FiSearch className='search-icon'/>
            <input onFocus={toggleFocus} onChange={getResults} ref={inputRef} placeholder='Search Twotter'></input>
        </div>
        <div className={showResults?"results":"hide-results"}>
           {results.length >0?results.map(user=>{return  <SearchResult user={user}/>}):<div>Try searching for someone</div>}
            </div>
        </div>
        </OutsideAlerter>
    </div>
  )
}

export default Trends