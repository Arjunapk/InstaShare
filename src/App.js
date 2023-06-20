import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserDetails from './components/UserDetails'
import NotFound from './components/NotFound'
import InstaShareContext from './context/InstaShareContext'
import './App.css'

class App extends Component {
  state = {searchInput: '', searchButtonInput: '', postsList: []}

  componentDidMount() {
    this.getPostsList()
  }

  getPostsList = async () => {
    const jwtToken = Cookies.get('jwt_token')
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
      })
    }
  }

  onChangeSearchInput = value => {
    this.setState({searchInput: value})
  }

  onClickSearchButton = () => {
    const {searchInput} = this.state
    this.setState({searchButtonInput: searchInput})
  }

  render() {
    const {searchInput, searchButtonInput, postsList} = this.state

    return (
      <InstaShareContext.Provider
        value={{
          searchInput,
          onChangeSearchInput: this.onChangeSearchInput,
          searchButtonInput,
          onClickSearchButton: this.onClickSearchButton,
          postsList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserDetails} />
          <Route component={NotFound} />
        </Switch>
      </InstaShareContext.Provider>
    )
  }
}

export default App
