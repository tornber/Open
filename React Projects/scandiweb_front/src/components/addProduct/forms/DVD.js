import React, { useContext, useEffect, useState } from 'react'
import '../Addproduct.css'
import dimensionsContext from '../../../dimensionsContext'

const DVD = () => {

  const {dimensions,setDimensions} = useContext(dimensionsContext)

  const handleFormChange = (e) => {
    setDimensions(e.target.value + "mb")
}

useEffect(() => {
  setDimensions("")
},[])

  return (
    <div className='labels--inputs'>
        <div className='labels'>
            <label>Size (MB) </label>
        </div>
        <div className='inputs'>
            <input type='number' min={0} name="size" onChange={handleFormChange} placeholder='size' required/>
        </div>
    </div>
  )
}

export default DVD