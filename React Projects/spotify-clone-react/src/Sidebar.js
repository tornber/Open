import React from 'react'
import './Sidebar.css'
import SidebarOptions from './SidebarOptions'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import LibraryIcon from '@material-ui/icons/LibraryMusic'
import { useDataLayerValue } from './DataLayer'

function Sidebar() {

  const [{playlists},dispatch] = useDataLayerValue()
  console.log(playlists.items)

  return (
    <aside className="sidebar">
        <img
         className='sidebar--logo'
         src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
         alt='spotify logo'
         />

        <SidebarOptions  Icon={HomeIcon} option="Home"/>
        <SidebarOptions  Icon={SearchIcon} option="Search"/>
        <SidebarOptions  Icon={LibraryIcon} option="Your Library"/>

        <br />
        <strong className='sidebar--title'>PLAYLISTS</strong>
        <hr />
        {playlists.items && playlists.items.map(playlist => {
          return (<SidebarOptions key={playlist.id} option={playlist.name} />)
        })}
    </aside>
  )
}

export default Sidebar