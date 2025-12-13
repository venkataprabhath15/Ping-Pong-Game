import React, { useState } from 'react'

const Form = () => {

    const[Text,setText]=useState("")
    const[input,setInput]=useState("")

    const getText=(event)=>{
        event.preventDefault();
        setText(input)
    }

  return (
    <div>
        <form>
            <label>Enter the text to display : </label>
            <input type="text" onChange={(e) => setInput(e.target.value)} /> 
            <button type="submit" onClick={getText}>Submit</button>
            <h1>The text is : {Text} </h1>
        </form>
    </div>
  )
}

export default Form