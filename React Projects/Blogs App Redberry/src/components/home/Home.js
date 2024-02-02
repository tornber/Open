import React, { useState,useEffect } from 'react'
import SiteLogo from '../../img/mainPageImg.png'
import SeeFullLogo from '../../img/Arrow.png'
import './Home.css'
import Blog from '../blog/Blog'
import Navbar from '../navbar/Navbar'
import { createDateFromString } from '../../utils/utils'

const Home = ({loginOrAdd,setLoginOrAdd}) => {


    const [categories, setCategories] = useState([])
    const [filterCategories, setFilterCategories] = useState([])
    
    const [fullPosts, setFullPosts] = useState([])
    const [posts, setPosts] = useState([])

    // const [showLoginForm, setShowLoginForm] = useState(true)
    // const [email, setEmail] = useState("")
    // const [emailBorder, setEmailBorder] = useState("")
    // const [emailError,setEmailError] = useState(false)
    // const [logedIn, setLogedIn] = useState(false)   
    // const [loginOrAdd, setLoginOrAdd] = useState("შესვლა")   

    useEffect(() => {
        fetch('https://api.blog.redberryinternship.ge/api/categories',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`                
            }
        })
            .then(res => res.json())
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => console.log(err))

        fetch('https://api.blog.redberryinternship.ge/api/blogs',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`                
            }
        })
            .then(res => res.json())
            .then(res => {
                const data = res.data.filter(post => {
                    const currentDate = new Date()
                    const postDate = createDateFromString(post?.publish_date)
                    return currentDate >= postDate 
                })
                setFullPosts(data)
                setPosts(data)
                
            })
            .catch(err => console.log(err))   
            const filter = JSON.parse(localStorage.getItem('filterCategories'))
            if (filter) {
                setFilterCategories(filter)
            }        
    }, [])

    useEffect(() => {
        const filter = JSON.parse(localStorage.getItem('filterCategories'))
        if (filter) { 
            filterPosts(0,false)
        }
    },[fullPosts])

    // const createDateFromString = (date) => {
    //     const [year, month, day] = date.split('-')
    //     return new Date(year, month, day)
    // }

    const filterPosts = (id,isSet) => {
        if (isSet) {    
            localStorage.setItem('filterCategories', JSON.stringify([...filterCategories,id]))
            setFilterCategories((prevFilterCategories) => [...prevFilterCategories, id])
        }
        const data = fullPosts.filter(post => {
            let res = false
            for (var category of post.categories) {
                if (isSet) {
                    if (category.id === id || filterCategories.includes(category.id)) {
                        res = true
                        break
                    }
                } else {
                    if (filterCategories.includes(category.id)) {
                        res = true
                        break
                    }
                }
            }
            return res
        })
        console.log("filtered use effect " + data)
        setPosts(data)
    }

    // const handleLoginOrAdd = (e) => {
    //     const {value} = e.target
    //     if (value === "შესვლა") {} setShowLoginForm(true)
    //     if (value === "დამატება") {
    //         // route to add page
    //     }
    // }
    // const handlEmailChange = (e) => {
    //     const {value} = e.target 
    //     if (value.endsWith("redberry.ge")) {
    //         setEmailBorder("green")
    //     } 
    //     if (value.length === 0) { 
    //         setEmailBorder("#5D37F3")
    //     }
    //     if (value.length > 0 && !value.endsWith("redberry.ge")) {
    //         setEmailBorder("red")
    //     }
    //     setEmail(value)
    // }

    // const handleLogin = (e) => {
    //     e.preventDefault()
    //     // if (emailBorder !== "green") return
    //     fetch('https://api.blog.redberryinternship.ge/api/login',{
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             Authorization: `Bearer ${localStorage.getItem('token')}`                
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res) {
    //                 // check token here
    //                 setLogedIn(true)
    //                 setLoginOrAdd("დამატება")

    //             } else {
    //                 setEmailError(true)
    //                 setEmailBorder("red")
    //             }
    //         })
    //         .catch(err => {
    //             setEmailError(true)
    //             setEmailBorder("red")
    //             console.log(err)
    //         })
    // }




  return (
    <div className='Home'>
        <Navbar loginOrAdd={loginOrAdd} setLoginOrAdd={setLoginOrAdd}/>
        {/* {showLoginForm && (<div className='login--form'>
            <div className='x--btn--container'>
                <div onClick={() => setShowLoginForm(false)} className='x'>
                    <div></div>
                    <div></div>
                </div>
            </div>
            {!logedIn && (<h4>შესვლა</h4>)}
            {logedIn ? (
                <div className='login--success'>
                    <img src={SuccessLogo} alt='success' />
                    <h4>წარმატებული ავტორიზაცია</h4>
                    <button className='ok--btn' onClick={() => setShowLoginForm(false)}>კარგი</button>
                    
                </div>
            ) :  (<form>
                    <label for="email">
                        ელ-ფოსტა
                    </label>
                    <input type="email" id="email" name="email" placeholder='Example@redberry.ge'
                    style={{border: `2px solid ${emailBorder}`}}
                    onChange={(e) => handlEmailChange(e)}/>
                    {emailError && (<div className='error'>
                        <img src={InfoLogo} alt='info error message' />
                        <p>ელ-ფოსტა არ მოიძებნა</p>
                    </div>)}
                    <button type='submit' onClick={(e) => handleLogin(e)}>შესვლა</button>
                </form>)
            }
        </div>)} */}
        <main className='main'>
            <div className='main-header'>
                <div className='site--name'>
                    <h1>ბლოგი</h1>
                </div>
                <img src={SiteLogo} alt='site-logo' />
            </div>
            <div className='categories'>
                {categories.map(category => {
                    return (<div style={{backgroundColor: category?.background_color,border: filterCategories.includes(category?.id) ? "3px solid black" : "none"}} 
                    onClick={() => filterPosts(category?.id,true)}
                    className='category' key={category?.id}>
                        <h4 style={{color: category?.text_color}}>{category?.title || "სათაური მიუწვდომელია"}</h4>
                    </div>)
                })}
            </div>
            <div className='posts'>
            {posts.map(post => {
                return (<Blog post={post} isFull={false}/>)
                })}
            </div>
        </main>
    </div>
  )
}

export default Home
