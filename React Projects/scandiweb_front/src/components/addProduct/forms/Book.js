import React, { useContext, useState, useEffect } from 'react'
import '../Addproduct.css'
import dimensionsContext from '../../../dimensionsContext'

const Book = () => {

  const {dimensions,setDimensions} = useContext(dimensionsContext)

  const handleFormChange = (e) => {
    setDimensions(e.target.value + "kg")
}

  useEffect(() => {
    setDimensions("")
  },[])

  return (
    <div className='labels--inputs'>
        <div className='labels'>
            <label>Weight (KG) </label>
        </div>
        <div className='inputs'>
            <input type='number' min={0} name="size" onChange={handleFormChange} placeholder='#weight' required/>
        </div>
</div>
  )
}

export default Book