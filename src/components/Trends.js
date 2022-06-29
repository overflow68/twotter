import React, {useState, useRef,useEffect} from 'react'
import '../styles/trends.css'
import {FiSearch} from 'react-icons/fi'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../Firebase';
import SearchResult from './SearchResult';
import OutsideAlerter from '../hooks/OutsideAlerter';

function Trends() {
    const[showResults,setShowResults] = useState(false)
    const [data,setData] = useState([])
    const [results,setResults] = useState([])
    useEffect(()=>{
      const getData = async()=>{
        const q = query(collection(db, "users"));
        const resultsCopy = []

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  resultsCopy.push(doc.data())
});
setData(resultsCopy)
    }
    getData()
    })
    let inputRef = useRef(null)
    
    const toggleFocus = ()=>{
        setShowResults(true)
    }
    const toggleFalse = ()=>{
        setShowResults(false)
    }

    const getResults = ()=>{
        let filteredResults = data.filter(item=> {
          let nameToLower = item.name.toLowerCase()
          let inputToLower = inputRef.current.value.toLowerCase()
          return nameToLower.includes(inputToLower) && inputToLower!==""
        })
        setResults(filteredResults)

        
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