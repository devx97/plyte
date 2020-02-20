import React, {useCallback, useState} from 'react'
import {TextField, InputAdornment} from '@material-ui/core'
import Search from '@material-ui/icons/Search';
import {addFirstVideo, searchForVideos} from '../actions'
import {useDispatch} from 'react-redux'
import {debounce} from 'lodash'

export default () => {
  const [term, setTerm] = useState('')
  const dispatch = useDispatch()

  const searchForVideosDebounced = useCallback(debounce(term => {
    dispatch(searchForVideos({term}))
  }, 300), [])

  return <TextField
      autoFocus
      style={{margin: 10, textAlign: 'center'}}
      label="Search"
      value={term}
      onChange={event => {
        const term = event.target.value
        setTerm(term)
        if (term.length) {
          searchForVideosDebounced(term)
        }
      }}
      onKeyDown={event => {
        if (event.keyCode === 13) {
          dispatch(addFirstVideo())
        }
      }}
      InputProps={{
        startAdornment:
            <InputAdornment position="start">
              <Search/>
            </InputAdornment>
      }}
  />
}