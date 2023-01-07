import React from 'react'
import './TweetBox.css'
// import {Avatar} from '@mui/core'
import Button from '@mui/core/ButtonUnstyled'

const TweetBox = () => {
  return (
    <div className='tweetBox'>
      <form>
        <div className='tweetBox--input'>
            <img src='https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg' className='tweetBox--avatar' />
            <input placeholder="what's happening?" type='text'></input>
        </div>
        <input className='tweetBox--imageInput' placeholder='Optional: Enter image URL' type='text' />
        <Button className='tweetBox--tweetBtn'>Tweet</Button>
      </form>
    </div>
  )
}

export default TweetBox
