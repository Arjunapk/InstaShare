import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import PostCardItem from '../PostCardItem'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import InstaShareContext from '../../context/InstaShareContext'
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
    userStoriesList: [],
    userStoriesApiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getUserStoriesList()
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

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
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

  renderPostsSuccessView = (postsList, searchButtonInput) => {
    const filteredPostsList = postsList.filter(each =>
      each.postDetails.caption
        .toLowerCase()
        .includes(searchButtonInput.toLowerCase()),
    )

    return (
      <ul className="posts-card">
        {filteredPostsList.map(eachPost => (
          <PostCardItem key={eachPost.postId} postItemDetails={eachPost} />
        ))}
      </ul>
    )
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

  //   renderPostsFailureView = () => <FailureView />

  //   renderPostsSpecificView = filteredPostsList => {
  //     const {postsApiStatus} = this.state

  //     switch (postsApiStatus) {
  //       case apiConstants.process:
  //         return this.renderLoadingView()
  //       case apiConstants.success:
  //         return this.renderPostsSuccessView(filteredPostsList)
  //       case apiConstants.failure:
  //         return this.renderPostsFailureView()

  //       default:
  //         return null
  //     }
  //   }

  render() {
    return (
      <InstaShareContext.Consumer>
        {value => {
          const {postsList, searchButtonInput} = value
          return (
            <>
              <div className="home-container">
                <Header />
                {this.renderUserStoriesSpecificView()}
                <hr className="break-line" />
                {this.renderPostsSuccessView(postsList, searchButtonInput)}
              </div>
            </>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }
}

export default Home
