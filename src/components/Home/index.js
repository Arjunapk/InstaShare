import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import PostCardItem from '../PostCardItem'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
// import InstaShareContext from '../../context/InstaShareContext'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const jwtToken = Cookies.get('jwt_token')

class Home extends Component {
  state = {
    searchInput: '',
    userStoriesList: [],
    userStoriesApiStatus: apiConstants.initial,
    postsList: [],
    postsApiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getUserStoriesList()
    this.getPostsList()
  }

  getUserStoriesList = async () => {
    this.setState({userStoriesApiStatus: apiConstants.process})
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.users_stories.map(eachStory => ({
        storyUrl: eachStory.story_url,
        userId: eachStory.user_id,
        userName: eachStory.user_name,
      }))
      this.setState({
        userStoriesList: updatedData,
        userStoriesApiStatus: apiConstants.success,
      })
    } else {
      this.setState({userStoriesApiStatus: apiConstants.failure})
    }
  }

  getPostsList = async () => {
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.posts.map(eachPost => ({
        comments: eachPost.comments.map(eachComment => ({
          comment: eachComment.comment,
          commentUserId: eachComment.user_id,
          commentUserName: eachComment.user_name,
        })),
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postDetails: {
          caption: eachPost.post_details.caption,
          imageUrl: eachPost.post_details.image_url,
        },
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
      }))
      this.setState({
        postsList: updatedData,
        postsApiStatus: apiConstants.success,
      })
    } else {
      this.setState({postsApiStatus: apiConstants.failure})
    }
  }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderUserStoriesSpecificView = () => {
    const {userStoriesApiStatus} = this.state

    switch (userStoriesApiStatus) {
      case apiConstants.process:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderUserStoriesSuccessView()
      case apiConstants.failure:
        return this.renderUserStoriesFailureView()

      default:
        return null
    }
  }

  renderLoadingView = () => <LoaderView />

  renderUserStoriesSuccessView = () => {
    const {userStoriesList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings} className="slider-card">
        {userStoriesList.map(eachStory => {
          const {userId, userName, storyUrl} = eachStory
          return (
            <div className="slider-item" key={userId}>
              <img
                className="slider-item-image"
                src={storyUrl}
                alt="company logo"
              />
              <p className="slider-item-description">{userName}</p>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderUserStoriesFailureView = () => <FailureView />

  renderPostsSuccessView = () => {
    const {postsList, searchInput} = this.state
    const filteredPostsList = postsList.filter(each =>
      each.postDetails.caption
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    return (
      <ul className="posts-card">
        {filteredPostsList.length > 0 ? (
          filteredPostsList.map(eachPost => (
            <PostCardItem key={eachPost.postId} postItemDetails={eachPost} />
          ))
        ) : (
          <li className="posts-empty-card">
            <img
              className="posts-empty-image"
              src="https://res.cloudinary.com/dexzw88rk/image/upload/v1687426695/Group_apdvbn.png"
              alt=""
            />
            <h1 className="posts-empty-heading">Search Not Found</h1>
            <p className="posts-empty-description">
              Try different keyword or search again
            </p>
          </li>
        )}
      </ul>
    )
  }

  renderPostsFailureView = () => <FailureView />

  renderPostsSpecificView = () => {
    const {postsApiStatus, searchInput} = this.state

    switch (postsApiStatus) {
      case apiConstants.process:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderPostsSuccessView(searchInput)
      case apiConstants.failure:
        return this.renderPostsFailureView()

      default:
        return null
    }
  }

  onChangeSearchInput = value => {
    this.setState({searchInput: value})
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <div className="home-container">
          <Header
            searchInput={searchInput}
            onChangeSearchInput={this.onChangeSearchInput}
            getFilteredPostsList={this.renderPostsSuccessView}
          />
          {this.renderUserStoriesSpecificView()}
          <hr className="break-line" />
          {this.renderPostsSpecificView()}
        </div>
      </>
    )
  }
}

export default Home
