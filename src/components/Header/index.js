import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiMenu} from 'react-icons/fi'
import {FaSearch} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {searchInputValue: ''}

  componentDidMount() {
    const {searchInput} = this.props
    this.setState({searchInputValue: searchInput})
  }

  render() {
    const {searchInputValue} = this.state
    const {history, onChangeSearchInput, getFilteredPostsList} = this.props

    const onClickMenu = () => {
      const navLinkCard = document.getElementById('navLinkCard')
      navLinkCard.classList.add('nav-link-card-active')
      const searchBar = document.getElementById('searchBar')
      searchBar.classList.remove('search-bar-active')
    }

    const onClickClose = () => {
      const navLinkCard = document.getElementById('navLinkCard')
      navLinkCard.classList.remove('nav-link-card-active')
    }

    const onChangeSearchInputValue = event => {
      this.setState({searchInputValue: event.target.value})
    }

    const onClickSearch = () => {
      onChangeSearchInput(searchInputValue)
      getFilteredPostsList()
    }

    const searchButton = () => {
      const navLinkCard = document.getElementById('navLinkCard')
      navLinkCard.classList.remove('nav-link-card-active')
      const searchBar = document.getElementById('searchBar')
      searchBar.classList.add('search-bar-active')
    }

    const onClickLogout = () => {
      Cookies.remove('jwt_token')
      history.replace('/login')
    }

    return (
      <header className="header-container">
        <div className="header-card-lg">
          <div className="header-logo-card">
            <Link to="/">
              <img
                className="header-website-logo"
                src="https://res.cloudinary.com/dexzw88rk/image/upload/v1686643261/Standard_Collection_8_yyque0.png"
                alt="website logo"
              />
            </Link>
            <h1 className="header-heading">Insta Share</h1>
          </div>
          <button
            className="header-menu-button"
            type="button"
            onClick={onClickMenu}
          >
            <FiMenu />
          </button>
          <ul className="header-nav-link-card">
            <li className="header-nav-link-item search-card">
              <input
                className="header-search"
                type="search"
                value={searchInputValue}
                onChange={onChangeSearchInputValue}
              />
              <button
                type="button"
                className="search-button-icon"
                onClick={onClickSearch}
              >
                <FaSearch color="#989898" />
              </button>
            </li>
            <li className="header-nav-link-item">
              <Link to="/" className="header-nav-link">
                Home
              </Link>
            </li>
            <li className="header-nav-link-item">
              <Link to="/my-profile" className="header-nav-link">
                Profile
              </Link>
            </li>
            <li className="header-nav-link-item">
              <button
                className="logout-button"
                type="button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="header-card-sm">
          <ul className="nav-link-card" id="navLinkCard">
            <li className="nav-link-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-link-item">
              <button
                className="search-button"
                type="button"
                onClick={searchButton}
              >
                Search
              </button>
            </li>
            <li className="nav-link-item">
              <Link to="/my-profile" className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-link-item">
              <button
                className="logout-button"
                type="button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
            <li className="nav-link-item">
              <button
                className="close-button"
                type="button"
                onClick={onClickClose}
              >
                <AiFillCloseCircle size="20" />
              </button>
            </li>
          </ul>
          <div className="search-bar" id="searchBar">
            <input
              className="header-search"
              type="search"
              value={searchInputValue}
              onChange={onChangeSearchInputValue}
            />
            <button
              type="button"
              className="search-button-icon"
              onClick={onClickSearch}
            >
              <FaSearch color="#989898" />
            </button>
          </div>
        </div>
      </header>
    )
  }
}

export default withRouter(Header)
