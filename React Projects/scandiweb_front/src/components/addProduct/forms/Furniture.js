import React, { useContext, useState, useEffect} from 'react'
import '../Addproduct.css'
import dimensionsContext from '../../../dimensionsContext'

const Furniture = () => {

  const {dimensions,setDimensions} = useContext(dimensionsContext)
  const [formData,setFormData] = useState({})

  const handleFormChange = (e) => {
    const {name,value} = e.target
    setFormData((prevFormData) => ({...prevFormData,[name]: value}))
  }

  useEffect(() => {
    setDimensions("")
  },[])

  useEffect(() => {
    if (formData.length > 0) {
      const height = formData.height
      const width = formData.width
      const length = formData.length
      setDimensions(height + "x" + width + "x" + length)
    }
  },[formData])

  return (
    <div className='labels--inputs'>
        <div className='labels'>
            <label>Height (CM)  </label>
            <label>Width (CM)  </label>
            <label>Length (CM)  </label>
        </div>
        <div className='inputs'>
        <input type='number' min={0} placeholder='#height' name="height" onChange={(e) => handleFormChange(e)} required/>
        <input type='number' min={0} placeholder='#width' name="width" onChange={(e) => handleFormChange(e)} required/>
        <input type='number' min={0} placeholder='#length' name="length" onChange={(e) => handleFormChange(e)} required/>
        </div>
</div>
  )
}

export default Furniture