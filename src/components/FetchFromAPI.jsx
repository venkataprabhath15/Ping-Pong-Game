import React,{useState,useEffect} from 'react'


const url="https://jsonplaceholder.typicode.com/posts"
const FetchFromAPI = () => {

    const[user,setUser]=useState([])
    
    const fetchData=async()=>{
        const response=await fetch(url)
        const data=await response.json()
        setUser(data)
        console.log(data)
    }

    //console.log(fetchData())
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>FetchFromAPI
        {user.map((curElem)=>{
            return(
                <div key={curElem.id} style={{border:"1px solid black",margin:"10px",padding:"10px"}}>
                    <h1>{curElem.title}</h1>
                    <p>{curElem.body}</p>
                </div>
            )
        })}
    </div>
  )
}

export default FetchFromAPI