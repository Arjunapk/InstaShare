import React from 'react'

const InstaShareContext = React.createContext({
  searchInput: '',
  onChangeSearchInput: () => {},
  searchButtonInput: '',
  onClickSearchButton: () => {},
  postsList: [],
})

export default InstaShareContext
