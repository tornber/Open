import React, { useEffect, useState } from 'react'
import './AddBlog.css'
import Navbar from '../navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import FolderAdd from '../../img/folder-add.png'

const AddBlog = ({loginOrAdd}) => {
  
  const navigate = useNavigate()
  const [data,setData] = useState({
    photo: '',
    author: '',
    title: '',
    description: '',
    publish_date: '',
    categories: '',
  })

  useEffect(() => {
    if (loginOrAdd === "შესვლა") {
      navigate(`${process.env.PUBLIC_URL}/`)
    }
  },[])

  const handleFormChange = (e) => {
    const {name,value} = e.target
    setData((prevData) => ({...prevData,[name]: value}))
  }

  return (
    <div className='AddBlog'>
      <Navbar isAddBlogPage={true}/>
      <form className='blog--form'>
        <h1>ბლოგის დამატება</h1>
        <label for="photo">ატვირთეთ ფოტო</label>
        <div className='photo'>
            <div>
              <img src={FolderAdd} alt='folder add'/>
              <p className='photo--description'>ჩააგდეთ ფაილი აქ ან <span>აირჩიეთ ფაილი</span></p>
            </div>
        </div>
        <input type="file" onChange={(e) => handleFormChange(e)} value={data?.photo} hidden={true} id="photo" name="photo" accept="image/*" />
        <div className='inputs'>
          <div className='input--group'>
            <label for="author">
              ავტორი *
            </label>
            <input type="text" onChange={(e) => handleFormChange(e)} value={data?.author} placeholder='შეიყვანეთ ავტორი'  id="author" name="author" accept="image/*" />
            <ul>
              <li><span className='messages'>მინიმუმ ოთხი სიმბოლო</span></li>
              <li><span className='messages'>მინიმუმ ორი სიტყვა</span></li>
              <li><span className='messages'>მხოლოდ ქართული სიმბოლოები</span></li>
            </ul>
          </div>
          <div className='input--group'>
            <label for="title">
              სათაური*
            </label>
            <input type="text" onChange={(e) => handleFormChange(e)} value={data?.title} placeholder='შეიყვანეთ სათაური'  id="title" name="title" accept="image/*" />
            <span className='messages'>მხოლოდ ქართული სიმბოლოები</span>
          </div>
        </div>
        <div className='input--group'>
            <label for="description">
                აღწერა *
              </label>
              <textarea onChange={(e) => handleFormChange(e)} value={data?.description}
              placeholder='შეიყვანეთ აღწერა'
              id='description' name='description'  rows='8' cols="90" ></textarea>
            <span className='messages'>მინიმუმ ოთხი სიმბოლო</span>
          </div>
          <div className='inputs'>
          <div className='input--group'>
            <label for="publish_date">
              გამოქვეყნების თარიღი *
            </label>
            <input type="text" onChange={(e) => handleFormChange(e)} value={data?.publish_date} placeholder='შეიყვანეთ ავტორი'  id="publish_date" name="publish_date" accept="image/*" />

          </div>
          <div className='input--group'>
            <label for="categories">
              კატეგორია *
            </label>
            <select onChange={(e) => handleFormChange(e)} value={data?.categories} placeholder='შეიყვანეთ სათაური'  id="categories" name="categories">
              <option id='1'>მარკეტი</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddBlog