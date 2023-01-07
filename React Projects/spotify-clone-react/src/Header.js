import React from 'react'
import './Header.css'
import Search from '@material-ui/icons/Search'
import Avatar from '@material-ui/core/Avatar'
import {useDataLayerValue} from './DataLayer'

function Header({ spotify }) {

    const [{user},dispatch] = useDataLayerValue()
    console.log(user)

  return (
    <div className='header'>
        <div className='header--left'>
            <Search />
            <input type='text' placeholder='Search for songs'/>
        </div>
        <div className='header--right'>
            <Avatar src={user && user.images && user.images.url && user.images[0].url} alt=""/>
            <h4>{user  && user.display_name}</h4>
        </div>
        
    </div>
  )
}

export default Header