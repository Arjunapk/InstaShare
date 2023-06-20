import {BsGrid3X3} from 'react-icons/bs'
import './index.css'

const UserDetailsCard = props => {
  const {userDetails} = props
  const {
    followersCount,
    followingCount,
    posts = [],
    postsCount,
    profilePic,
    stories = [],
    userBio,
    userId,
    userName,
  } = userDetails

  const renderStoriesAndPosts = (story, post) => (
    <>
      {story.length > 0 ? (
        <ul className="user-details-stories-list-card">
          {stories.map(eachStory => {
            const {id, image} = eachStory

            return (
              <li key={id} className="user-details-stories-list-item">
                <img
                  className="user-details-stories-list-image"
                  src={image}
                  alt="user story"
                />
              </li>
            )
          })}
        </ul>
      ) : null}
      <hr className="break-line" />
      <div className="user-details-posts-card">
        <p className="user-details-posts-heading">
          <BsGrid3X3 className="reaction-icon" />
          Posts
        </p>
        {post.length > 0 ? (
          <ul className="user-details-posts-list-card">
            {posts.map(eachPost => {
              const {id, image} = eachPost

              return (
                <li key={id} className="user-details-list-item">
                  <img
                    className="user-details-list-item-image"
                    src={image}
                    alt="user post"
                  />
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </>
  )

  return (
    <>
      <div className="user-details-container-sm">
        <h3 className="user-details-name">{userName}</h3>
        <div className="user-details-card">
          <img
            className="user-profile-pic"
            src={profilePic}
            alt="user profile"
          />
          <div className="user-counts-card">
            <div className="user-counts">
              <p className="user-count">
                <span>{postsCount}</span>
              </p>
              <p className="user-count">Posts</p>
            </div>
            <div className="user-counts">
              <p className="user-count">
                <span>{followersCount}</span>
              </p>
              <p className="user-count">Followers</p>
            </div>
            <div className="user-counts">
              <p className="user-count">
                <span>{followingCount}</span>
              </p>
              <p className="user-count">Following</p>
            </div>
          </div>
        </div>
        <h3 className="user-details-id">{userId}</h3>
        <p className="user-details-bio">{userBio}</p>
        {renderStoriesAndPosts(stories, posts)}
      </div>
      <div className="user-details-container-lg">
        <div className="user-details-card">
          <img
            className="user-profile-pic"
            src={profilePic}
            alt="user profile"
          />
          <div className="user-details-content">
            <h3 className="user-details-name">{userName}</h3>
            <div className="user-counts-card">
              <div className="user-counts">
                <p className="user-count">
                  <span>{postsCount}</span> Posts
                </p>
              </div>
              <div className="user-counts">
                <p className="user-count">
                  <span>{followersCount} </span> Followers
                </p>
              </div>
              <div className="user-counts">
                <p className="user-count">
                  <span>{followingCount} </span> Following
                </p>
              </div>
            </div>
            <h3 className="user-details-id">{userId}</h3>
            <p className="user-details-bio">{userBio}</p>
          </div>
        </div>
        {renderStoriesAndPosts(stories, posts)}
      </div>
    </>
  )
}

export default UserDetailsCard
