import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserDetailsCard from '../UserDetailsCard'

class MyProfile extends Component {
  state = {myProfileDetails: {}}

  componentDidMount() {
    this.getMyProfileDetails()
  }

  getMyProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        posts: data.profile.posts,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        stories: data.profile.stories,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }
      this.setState({myProfileDetails: updatedData})
    }
  }

  render() {
    const {myProfileDetails} = this.state
    return (
      <>
        <Header />
        <UserDetailsCard userDetails={myProfileDetails} />
      </>
    )
  }
}

export default MyProfile
