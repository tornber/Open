import React, { useState,useEffect } from 'react'
import './BlogPage.css'
import { useParams } from 'react-router-dom'
import Blog from '../blog/Blog'
import BackArrow from '../../img/BackArrow.png'
import FrontArrow from '../../img/FrontArrow.png'
import Navbar from '../navbar/Navbar'
import Back from '../navigationArrow/Back'
import { createDateFromString } from '../../utils/utils'


const BlogPage = ({loginOrAdd,setLoginOrAdd}) => {

    const {id} = useParams()
    const [post,setPost] = useState({})
    const [posts,setPosts] = useState([])
    const [postFilterIndex,setPostFilterIndex] = useState(3)
    const [prevBtn,setPrevBtn] = useState("")
    const [nextBtn,setNextBtn] = useState("")

    useEffect(() => {
        fetch(`https://api.blog.redberryinternship.ge/api/blogs/${id}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`                
            }
        })
            .then(res => res.json())
            .then(res => {
                setPost(res)  
                const categories = res?.categories  
                const id = res.id
                if (res && res?.categories) {                    
                    fetch('https://api.blog.redberryinternship.ge/api/blogs',{
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`                
                        }
                    })
                        .then(response => response.json())
                        .then(response => {
                            let data = response.data.filter(blog => {
                                if (blog.id === res.id) {
                                    return false
                                }
                                let result = false
                                for (var category of blog.categories) {
                                    const ids = categories.map((category) => {return category.id})
                                    if (ids.includes(category.id)) {
                                        console.log("catgory match")
                                        result = true
                                        break
                                    }
                                }
                                return result                         
                            })
                            data = data.filter(post => {
                                console.log(post?.publish_date)
                                const currentDate = new Date()
                                const postDate = createDateFromString(post?.publish_date)
                                return currentDate >= postDate 
                            })
                            setPosts(data)
                            
                        })
                        .catch(err => console.log(err))              
                }
            })
            .catch(err => console.log(err))
        
        // if (postFilterIndex + 6 >= posts.length + 3) {
        //     setNextBtn("#E4E3EB")
        // } else {
        //     setNextBtn("#5D37F3")
        // }
            
            
        // fetch('https://api.blog.redberryinternship.ge/api/blogs',{
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json',
        //         Authorization: `Bearer ${localStorage.getItem('token')}`                
        //     }
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log(res.data)
        //         const data = res.data.filter(blog => {
        //             let res = false
        //             for (var category of blog.categories) {
        //                 if (post && post?.categories && post?.categories.includes(category)) {
        //                     res = true
        //                     break
        //                 }
        //             }
        //             return res                         
        //         })
        //         console.log(data)
        //         setPosts(data)
                
        //     })
        //     .catch(err => console.log(err))   
    },[])

    const handlePrev = () => {
        if (postFilterIndex - 3 === 0) {
            return 
        } 
        if (postFilterIndex - 6 === 0) {
            setPrevBtn("#E4E3EB")
        } else {
            setPrevBtn("#5D37F3")
        }
        if (postFilterIndex >= posts.length + 3) {
            setNextBtn("#E4E3EB")
        } else {
            setNextBtn("#5D37F3")
        }
        setPostFilterIndex((prevPostFilterIndex) => prevPostFilterIndex - 3)
    }

    const handleNext = () => {
        if (postFilterIndex + 3 >= posts.length + 3) {
            return 
        } 
        console.log(posts.length)
        if (postFilterIndex + 6 >= posts.length + 3) {
            setNextBtn("#E4E3EB")
        } else {
            setNextBtn("#5D37F3")
        }
        if (postFilterIndex - 6 === 0) {
            setPrevBtn("#E4E3EB")
        } else {
            setPrevBtn("#5D37F3")
        }
        setPostFilterIndex((prevPostFilterIndex) => prevPostFilterIndex + 3)
    }

    return (
    <div className='BlogPage'>
        <Navbar loginOrAdd={loginOrAdd} setLoginOrAdd={setLoginOrAdd}/>
        <main className='BlogPage--main'>
            <Back />
            <Blog post={post} isFull={true}/>
            <div className='pagination--container'>
                <h3>მსგავსი სტატიები</h3>
                <div className='pagination--btns'>
                    <div style={{backgroundColor: prevBtn}} onClick={() => handlePrev()} className='pagination--btn'>
                    <img src={BackArrow}/>
                    </div>
                    <div style={{backgroundColor: nextBtn}} onClick={() => handleNext()} className='pagination--btn'>
                    <img src={FrontArrow}/>
                    </div>
                </div>
            </div>
            <div className='posts posts--blog--page'>
                {posts && posts.slice(postFilterIndex -3,postFilterIndex).map(postData => {
                    return (<Blog post={postData} isFull={false}/>)
                })}
            </div>
        </main>
    </div>
  )
}

export default BlogPage