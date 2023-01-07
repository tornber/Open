import React from 'react'
import './SidebarOptions.css'

function SidebarOptions({Icon,option}) {
  return (
    <div className="sidebarOptions">
        {Icon && <Icon className="sidebarOptions--icon" />}
        {Icon ? <h3>{option}</h3> : <p>{option}</p>}
    </div>
  )
}

export default SidebarOptions