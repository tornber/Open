import React from 'react'
import './Feed.css'
import Post from './Post'
import TweetBox from './TweetBox'

const Feed = () => {
  return (
    <div className='feed'>
      <h2 className='feed--header'>Home</h2>
      <TweetBox />
      <Post />
    </div>
  )
}

export default Feed
