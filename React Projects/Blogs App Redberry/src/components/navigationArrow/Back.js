import React from 'react'
import './Back.css'
import BackArrow from '../../img/BackHomeArrow.png'
import { useNavigate } from 'react-router-dom'



const Back = () => {

  const navigate = useNavigate()

  return (
    <div className='Back' onClick={() => navigate('/')}><img src={BackArrow}/></div>
  )
}

export default Back