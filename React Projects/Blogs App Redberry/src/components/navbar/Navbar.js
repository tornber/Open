import React, { useState } from 'react'
import './Navbar.css'
import Logo from '../../img/logo.png'
import SuccessLogo from '../../img/success.png'
import InfoLogo from '../../img/info.svg'
import {useNavigate} from 'react-router-dom';


const Navbar = ({loginOrAdd,setLoginOrAdd,isAddBlogPage}) => {

    const navigate = useNavigate()
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [email, setEmail] = useState("")
    const [emailBorder, setEmailBorder] = useState("")
    const [emailError,setEmailError] = useState(false)
    const [logedIn, setLogedIn] = useState(false)   

    const handleLoginOrAdd = (e) => {
        console.log(loginOrAdd)
        if (loginOrAdd === "შესვლა") {} setShowLoginForm(true)
        if (loginOrAdd === "დამატება") {
            // route to add page
            navigate('/blog/add')
        }
    }

    const handlEmailChange = (e) => {
        const {value} = e.target 
        if (value.endsWith("redberry.ge")) {
            setEmailBorder("green")
        } 
        if (value.length === 0) { 
            setEmailBorder("#5D37F3")
        }
        if (value.length > 0 && !value.endsWith("redberry.ge")) {
            setEmailBorder("red")
        }
        setEmail(value)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        // if (emailBorder !== "green") return
        fetch('https://api.blog.redberryinternship.ge/api/login',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`                
            },
            body: JSON.stringify({email})
        }).then(res => {
                if (res.status === 204) {
                    return res
                }
                else if (res.ok) {
                    const contentType = res.headers.get('content-type')
                    console.log(contentType)
                    if (contentType.includes('application/json')) {
                        return res.json()
                    } else {
                        console.log("Non json res" + res)
                    }
                } else {
                    console.log("can not back response" + res)
                }
            })
            .then(res => {
                if (res.status === 204) {
                    setLogedIn(true)
                    setLoginOrAdd("დამატება")
                    // showLoginForm(false)

                } else {
                    setEmailError(true)
                    setEmailBorder("red")
                }
            })
            .catch(err => {
                setEmailError(true)
                setEmailBorder("red")
                console.log(err)
            })
    }


  return (
    <header className="App-header">
            <div className='navbar'>
                <div className={`${isAddBlogPage && "center"} navbar-container`}>
                    <img src={Logo} className="App-logo" alt="logo" onClick={() => navigate('/')}/>
                    {!isAddBlogPage && (<button className='login--btn' onClick={(e) => handleLoginOrAdd(e)}>{loginOrAdd}</button>)}
                </div>
            </div>
            {showLoginForm && (<div className='login--form'>
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
                    onChange={(e) => handlEmailChange(e)} value={email}/>
                    {emailError && (<div className='error'>
                        <img src={InfoLogo} alt='info error message' />
                        <p>ელ-ფოსტა არ მოიძებნა</p>
                    </div>)}
                    <button type='submit' onClick={(e) => handleLogin(e)}>შესვლა</button>
                </form>)
            }
        </div>)}  
        </header>

  )
}

export default Navbar