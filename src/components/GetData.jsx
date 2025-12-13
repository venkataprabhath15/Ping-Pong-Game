import React from 'react'
import {data} from './data.js'

const GetData = () => {
  return (
    <div>
        <h1>Get Data from another file</h1>
        {data.map((item)=>{
            return(
                <div>
                    <p>{item.id})</p>
                    <p>{item.name}</p>
                    <p>{item.email}</p>
                    <p>{item.phone}</p>
                    <p>{item.address.street}</p>
                    <p></p>
                    <hr></hr>
                </div>
            )})}
    </div>
  )
}

export default GetData