import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username === '' || password === '') {
      this.setState({errorMsg: 'Enter valid input'})
      return
    }
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errorMsg} = this.state

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            className="login-landing-image"
            src="https://res.cloudinary.com/dexzw88rk/image/upload/v1686643186/OBJECTS_kol7py.png"
            alt="website login"
          />
          <form className="login-form" onSubmit={this.onSubmitForm}>
            <img
              className="login-website-logo"
              src="https://res.cloudinary.com/dexzw88rk/image/upload/v1686643261/Standard_Collection_8_yyque0.png"
              alt="website logo"
            />
            <h1 className="login-heading">Insta Share</h1>
            <label className="login-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="login-input"
              id="username"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label className="login-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="login-input"
              id="password"
              type="password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button className="login-button" type="submit">
              Login
            </button>
            <p className="login-error-msg">{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
