import React from 'react'
import { useState } from 'react';

const Screen = () => {

    const [width, setWidth] = useState(window.innerWidth);

    window.addEventListener("resize", () => setWidth(window.innerWidth));  
    
    const[height,setHeight]=useState(window.innerHeight);

    window.addEventListener("resize", () => setHeight(window.innerHeight));


  return (
    <div>The width is : {width} <br></br> The height is : {height}</div>
  )
}
 
export default Screen