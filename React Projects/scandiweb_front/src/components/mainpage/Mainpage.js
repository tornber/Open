import React,{useEffect, useState} from 'react'
import '../../App.css';
import Navbar from '../navbar/Navbar';
import deleteItemsContext from '../../deleteItemsContext';
import axios from 'axios';

const Mainpage = () => {

    const [items,setItems] = useState([])
    const [checked,setChecked]  = useState([])

    const handleClick = (ind) => {
        if (checked.includes(ind)) {
            const newChecked = checked.filter((item) => item !== items[ind].sku)
            setChecked(newChecked)
        } else {
            setChecked((prevChecked) => [...prevChecked,items[ind].sku])
        }
    }

    useEffect(() => {
        const url = "http://localhost:80/scandiweb_back/api/products/products.php"
        axios.get(url).then((res) => {
            setItems(res.data)
        })
    },[])


    return (
        <div>
            <deleteItemsContext.Provider value={{checked,setChecked}}>
                <Navbar />  
            </deleteItemsContext.Provider>
            <div className='border'></div>
            <div className='items--box'>
                {items.map((item,ind) => (
                <div className='item--box' key={ind}>
                    <input type='checkbox' onClick={() => handleClick(ind)} className='checkbox'/>
                    <p>{item.sku}</p>
                    <p>{item.name}</p>
                    <p>{item.price} $</p>
                    <p>{item.size}</p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Mainpage