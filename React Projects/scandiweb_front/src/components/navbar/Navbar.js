import React,{useContext} from 'react'
import './Navbar.css'
import {useNavigate} from 'react-router-dom'
import dimensionsContext from '../../dimensionsContext'
import formDataContext from '../../formDataContext'
import axios from 'axios'
import deleteItemsContext from '../../deleteItemsContext'

const Navbar = ({onAdd}) => {

  const navigate = useNavigate()
  const {dimensions,setDimensions} = useContext(dimensionsContext)
  const {formData,setFormData} = useContext(formDataContext)
  const {checked,setChecked}  = useContext(deleteItemsContext)

  const handleAdd = () => {
    navigate('/addProduct')
  }

  const handleSave = () => {
    const data = new FormData()
    data.append("sku",formData.sku)
    data.append("name",formData.name)
    data.append("price",formData.price)
    if (!dimensions.length > 0) {
      return
    }
    data.append("size",dimensions)
    const url = "http://localhost:80/scandiweb_back/api/products/create.php"
    axios.post(url,data).then(res => {
      navigate('/')
    }) 

  }

  const handleDelete = () => {
    const url = "http://localhost:80/scandiweb_back/api/products/delete.php"
    axios.post(url,JSON.stringify(checked)).then(res => {
      window.location.reload()
    }) 
  }

  const handleCancel = () => {
      navigate('/')
  }

  return (
    <div className='navbar'>
        <h1 className='navbar--header'>Product List</h1>
        {onAdd ? (
          <div className='d-flex justify-content-between mb-0'>
              <input type='submit' className='save--btn btn btn-success shadow-none me-5' onClick={() => handleSave()} value="Save"/>
              <button onClick={() => handleCancel()} className='btn btn-danger me-5' >Cancel</button>
          </div>
        ): (
          <div className='right--navbar'>
              <button onClick={() => handleAdd()} className='add--btn'>Add</button>
              <button onClick={() => handleDelete()} className='delete-btn' id='delete-product-btn'>Mass delete</button>
          </div>
        )}
    </div>
  )
}

export default Navbar