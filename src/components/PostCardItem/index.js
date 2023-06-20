import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaRegComment} from 'react-icons/fa'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import './index.css'

class PostCardItem extends Component {
  state = {likeStatus: false}

  onClickLike = async postId => {
    const {likeStatus} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const message = {like_status: !likeStatus}
    const options = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(message),
    }
    await fetch(url, options)
    this.setState(prevState => ({likeStatus: !prevState.likeStatus}))
  }

  render() {
    const {likeStatus} = this.state
    const {postItemDetails} = this.props
    const {
      userId,
      userName,
      comments,
      createdAt,
      postId,
      postDetails,
      profilePic,
    } = postItemDetails
    let {likesCount} = postItemDetails
    const {caption, imageUrl} = postDetails
    likesCount = likeStatus ? likesCount + 1 : likesCount

    const onClickLike = () => {
      this.onClickLike(postId)
    }

    return (
      <li className="post-item">
        <Link to={`/users/${userId}`} className="post-item-link">
          <div className="post-item-user-card">
            <img src={profilePic} alt="" className="post-item-user-profile" />
            <p className="post-item-user-name">{userName}</p>
          </div>
        </Link>
        <div className="post-item-image-card">
          <img src={imageUrl} alt="" className="post-item-image" />
        </div>
        <div className="post-item-content">
          <div className="post-item-reaction-card">
            {likeStatus ? (
              <FcLike className="reaction-icon" onClick={onClickLike} />
            ) : (
              <BsHeart className="reaction-icon" onClick={onClickLike} />
            )}
            <FaRegComment className="reaction-icon" />
            <BiShareAlt className="reaction-icon" />
          </div>
          <p className="post-item-likes-count">{likesCount} likes</p>
          <p className="post-item-caption">{caption}</p>
          <ul className="post-item-comments-card">
            {comments.map(eachComment => {
              const {comment, commentUserName} = eachComment

              return (
                <li key={commentUserName} className="post-item-comment">
                  <p>
                    <span>{commentUserName} </span>
                    {comment}
                  </p>
                </li>
              )
            })}
          </ul>
          <p className="post-item-created-at">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default PostCardItem
