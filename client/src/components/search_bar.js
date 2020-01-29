import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Search from '@material-ui/icons/Search';

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {term: ''}
  }

  render() {
    return <TextField
        style={{margin: 10, textAlign: 'center'}}
        label="Search"
        value={this.state.term}
        onChange={event => this.onInputChange(event.target.value)}
        InputProps={{
          startAdornment: (
              <InputAdornment position="start">
                <Search/>
              </InputAdornment>
          ),
        }}
    />
  }

  onInputChange(term) {
    this.setState({term})
    this.props.onSearchTermChange(term)
  }
}

export default SearchBar