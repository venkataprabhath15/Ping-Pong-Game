import React, { useEffect } from 'react'
import {useState} from 'react'

const ClickEvent = () => {

    const[num,setNum] = useState(0);

    const add=()=>{
        setNum(num+1);
    }

    const sub=()=>{
        setNum(num-1);
    }
    useEffect(() => {
        if(num<0){
            alert("Number cannot be negative");
            setNum(0);
        }
    }, [num]);

    const reset=()=>{
        setNum(0);
    }
  return (
    <div>
       The number is : {num}<br></br>
       <button  onClick={add}>Add</button>
       <button  onClick={sub}>Sub</button>
       <button  onClick={reset}>Reset</button>
    </div>
    
  )
}

export default ClickEvent;  