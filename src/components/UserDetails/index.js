import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserDetailsCard from '../UserDetailsCard'
import './index.css'

class UserDetails extends Component {
  state = {userDetails: {}}

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        posts: data.user_details.posts,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        stories: data.user_details.stories,
        userBio: data.user_details.user_bio,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
      }
      this.setState({userDetails: updatedData})
    } else {
      const {history} = this.props
      history.push('/')
    }
  }

  render() {
    const {userDetails} = this.state

    return (
      <>
        <Header />
        <UserDetailsCard userDetails={userDetails} />
      </>
    )
  }
}

export default UserDetails
