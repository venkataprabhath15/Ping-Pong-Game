import React, { useState } from 'react'

const Form = () => {

    const[Text,setText]=useState("")

    const getText=(event)=>{
        setText(event.target.value)
    }

  return (
    <div>
        <form>
            <label>Enter the text to display : </label>
            <input type="text" onChange={getText} />
            <button type="submit">Submit</button>
            <h1>The text is : {Text} </h1>
        </form>
    </div>
  )
}

export default Form