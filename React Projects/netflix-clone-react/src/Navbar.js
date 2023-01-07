import React,{ useState ,useEffect } from 'react'
import './Navbar.css'

const Navbar = () => {

    const [bgBlack,setBgBlack] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll',() => {
            if(window.scrollY > 100) {
                setBgBlack(true)
            } else setBgBlack(false)
        })
        return () => {
            window.removeEventListener("scroll",function remove() {
                return
            })
        }
        },[])


  return (
    <div className={`nav ${bgBlack && 'nav--black'}`}>
        <img
         className='logo'
         src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
         alt='Netflix Logo'
        />
        <img
         className='avatar'
         src='https://cdn1.iconfinder.com/data/icons/random-115/24/person-512.png'
         alt='User Avatar'
        />
    </div>
  )
}

export default Navbar