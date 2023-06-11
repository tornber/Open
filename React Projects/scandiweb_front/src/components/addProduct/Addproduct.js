import React, { useState } from 'react'
import './Addproduct.css'
import DVD from './forms/DVD'
import Furniture from './forms/Furniture'
import Book from './forms/Book'
import Navbar from '../navbar/Navbar';
import axios from 'axios'
import dimensionsContext from '../../dimensionsContext'
import {useNavigate} from 'react-router-dom'
import FormDataContext from '../../formDataContext'

const Addproduct = () => {

    const [type,setType] = useState()
    const [formData,setFormData] = useState({})
    const [dimensions,setDimensions] = useState("")
    const navigate = useNavigate()

    const handleFormChange = (e) => {
        const {name,value} = e.target
        setFormData((prevFormData) => ({...prevFormData,[name]: value}))
    }

    const returnForm = () => {
        switch(formData.select) {
            case "DVD": return <DVD/>
            case "Furniture": return <Furniture/>
            case "Book": return <Book/>
        }
    }

  return (
        <div className='add--product'>
            <FormDataContext.Provider value={{formData,setFormData}}>
            <dimensionsContext.Provider value={{dimensions,setDimensions}}>
                <div>
                    <Navbar onAdd={true}/>
                    <div className='border'></div>
                        <form method='post'>
                            <div className='labels--inputs'>
                            <div className='labels'>
                                <label>SKU  </label>
                                <label>Name  </label>
                                <label>Price  </label>
                            </div>
                            <div className='inputs'>
                            <input type='text' placeholder='#SKU' name="sku" onChange={handleFormChange} required/>
                            <input type='text' placeholder='#name' name="name" onChange={handleFormChange} required/>
                            <input type='text' placeholder='#price' name="price" onChange={handleFormChange} required/>
                            </div>
                            </div>
                            <div className='switcher--wrapper'>
                                <label>Type Switcher</label>
                                <select id='productType' name="select" onChange={handleFormChange} required>
                                    <option selected hidden disabled>Type Switcher</option>
                                    <option  value={"DVD"}>DVD</option>
                                    <option  value={"Furniture"}>Furniture</option>
                                    <option  value={"Book"}>Book</option>
                                </select>
                            </div>
                            {formData.select && 
                                (<div className='type--form'>
                                    {returnForm()}
                                </div>)
                            }
                        </form>
                    </div>
            </dimensionsContext.Provider>
            </FormDataContext.Provider>
        </div>
    )
}

export default Addproduct