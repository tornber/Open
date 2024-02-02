import React from 'react'
import './Blog.css'
import SeeFullLogo from '../../img/Arrow.png'
import {useNavigate} from 'react-router-dom';



const Blog = ({post,isFull}) => {

    const navigate = useNavigate()

    const handleRoute = () => {
        navigate(`/blog/${post?.id}`)
        window.location.reload()
    }

  return (
      <div className={`${isFull ? "post--full " : ''}post`} key={post?.id}>
        <img className={`${isFull ? "photo--full " : ''}photo`} src={post?.image} />
        <div className={`${isFull ?  "post--info--full " : ''}post--info`}>
            <h6 className={`${isFull ?  "author--full " : ''}author`}>{post?.author}</h6>
            <p className={`${isFull ?  "publish--date--full " : ''}publish--date`}>{post?.publish_date}</p>
            <h3 className={`${isFull ?  "title--full " : ''}title`}>{post?.title}</h3>
            <div className={`${isFull ?  "categories--full " : ''}categories post--categories`}>
                {post?.categories && post?.categories.map(category => {
                return (<div style={{backgroundColor: category?.background_color}} className={`${isFull ?  "post--category--full " : ''}post--category`} key={category?.id}>
                    <h4 style={{color: category?.text_color}}>{category?.title || "სათაური მიუწვდომელია"}</h4>
                </div>)})}
            </div>
            <p className={`${isFull ?  "post--full " : ''}description`}>{isFull ? post?.description : post?.description.length > 80 ? post?.description.slice(0,80) + "..." : post?.description.length}</p>
            {!isFull && (<div onClick={() => handleRoute()} className={`${isFull ?  "link--full " : ''}link`}>
                <h4>სრულად ნახვა</h4>
                <img src={SeeFullLogo} alt='see full post'/>
            </div>)}
        </div>
      </div>
  )
}
export default Blog