import React, {Component} from 'react'
import SearchBar from './search_bar'
import VideoList from './video_list'
import VideoPlaylist from './video_playlist'
import VideoDetail from './video_detail'
import _ from 'lodash'
import YouTubeSearch from 'youtube-search'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
import {CssBaseline, Typography, createMuiTheme, Paper, Grid} from '@material-ui/core'
import {ToggleButton} from '@material-ui/lab'
import {CheckBox, CheckBoxOutlineBlank} from '@material-ui/icons'
import {ThemeProvider} from "@material-ui/styles";

const GENIUS_API_KEY = 'DncOPjHRnMOPSe3Yzl56lpCsIah0zalJ-u9UjhWetfuaZ_4lsaA6RYhDsZSTEkWK'
const YOUTUBE_API_KEY = 'AIzaSyCqDTrKdPZ-MjqMdJ7P25W_KV4m9yC92WU'

class App extends Component {

  constructor(props) {
    super(props)
    /*
        videos - 5 videos shown just below searchbar
        selectedVideo - what video is playing right now
        currentIndex - current index in queue to help with controlling playlist
     */
    this.state = {
      socket: null,
      videos: [],
      selectedVideo: null,
      geniusSongUrl: '',
      queue: [],
      currentIndex: 0,
      master: true,
      playerHeight: null,
    }
    this.videoPl = React.createRef()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.playerHeight && this.videoPl && this.videoPl.current
        && this.videoPl.current.childNodes.length
        > 0
        && this.videoPl.current.childNodes[0].childNodes.length > 0
        && this.videoPl.current.childNodes[0].childNodes[0].offsetHeight) {
      this.setState({
        playerHeight: this.videoPl && this.videoPl.current && this.videoPl.current.childNodes.length
            > 0
            && this.videoPl.current.childNodes[0].childNodes.length > 0
            && this.videoPl.current.childNodes[0].childNodes[0].offsetHeight
      })
    }
  }

  componentDidMount = async () => {
    window.addEventListener("resize", () => this.setState({
      playerHeight: this.videoPl && this.videoPl.current && this.videoPl.current.childNodes.length
          > 0
          && this.videoPl.current.childNodes[0].childNodes.length > 0
          && this.videoPl.current.childNodes[0].childNodes[0].offsetHeight
    }));
    console.log('START')
    let socket;
    if (process.env.PORT) {
      socket = await socketIOClient()
    } else {
      socket = await socketIOClient('http://192.168.8.10:4000')
    }
    this.setState({socket}, () => {
      this.state.socket.on('updateList', videos => {
        this.setState({queue: videos})
      })
      this.state.socket.on('updateVideo', selectedVideo => {
        if (this.state.master) {
          this.setState({selectedVideo})
        }
      })
    })

  }

  videoSearch(term) {
    if (term.length > 0) {
      YouTubeSearch(term, {maxResults: 6, type: 'video', key: YOUTUBE_API_KEY}, (err, videos) => {
        if (!err) {
          videos.map(video => {
            let parsedTitleEl = new DOMParser().parseFromString(video.title, "text/html");
            video.title = parsedTitleEl.documentElement.textContent
            return video
          })
          this.setState({videos: videos.slice(0, 5)}) //there's a bug and you got one item less in response so i'm requesting one more
        }
      })
    }
  }

  onVideoAdd(videoToAdd, addAsNext) {
    if (!_.find(this.state.queue, obj => obj.id === videoToAdd.id)) { // checking if there is such video on playlist already
      if (addAsNext) {
        this.state.socket.emit('addAsNext', videoToAdd)
      } else {
        this.state.socket.emit('addNewVideo', videoToAdd)
      }
    }
    YouTubeSearch('', {
      maxResults: 6,
      type: 'video',
      key: YOUTUBE_API_KEY,
      relatedToVideoId: videoToAdd.id
    }, (err, videos) => {
      // searching for related videos
      if (!err) {
        videos.map(video => {
          let parsedTitleEl = new DOMParser().parseFromString(video.title, "text/html");
          video.title = parsedTitleEl.documentElement.textContent
          return video
        })
        this.setState({videos: videos.slice(0, 5)}) //there's a bug and you got one item less in response so i'm requesting one more
      }
    })
  }

  onVideoSelect(selectedVideo) { // this function changes current playing video
    if (this.state.queue.length === 0
        || !_.find(this.state.queue, obj => obj.id === selectedVideo.id)) // if there is nothing in queue yet or video user clicked is not on playlist
    {
      this.onVideoAdd(selectedVideo, true)
    }
    // this.setState({selectedVideo})
    this.state.socket.emit('selectVideo', selectedVideo)
    let title = selectedVideo.title
    document.title = title
    this.searchForGeniusLyrics(title, res => {
      let geniusSongUrl
      if (res.data.response.hits[0]) {
        geniusSongUrl = res.data.response.hits[0].result.url
      } else {
        geniusSongUrl = ''
      }
      this.setState({geniusSongUrl})
    })
  }

  searchForGeniusLyrics(title, callback) {
    let indexOfSecondQuotationMark = title.indexOf('"', title.indexOf('"') + 1) //some advanced searching algorithms XD
    if (indexOfSecondQuotationMark > 0) {
      title = title.substring(0, indexOfSecondQuotationMark + 1)
    } else if (title.indexOf(' ', title.indexOf('- ') + 2) > 0) {
      title = title.substring(0, title.indexOf(' ', title.indexOf('- ') + 2))
    } else {
      title = ''
    }
    if (title.length) {
      axios.get(`https://api.genius.com/search?q=${title}&access_token=${GENIUS_API_KEY}`)
      .then(res => {
        callback(res)
      })
    } else {
      this.setState({geniusSongUrl: ''})
    }

  }

  onVideoEnds(video, event) {
    // eslint-disable-next-line
    if (event.data === YT.PlayerState.ENDED) {
      let index = this.state.queue.findIndex(i => i.id === video.id)
      if (this.state.queue[index + 1]) {
        this.onVideoSelect(this.state.queue[index + 1])
        this.setState({currentIndex: this.state.currentIndex + 1})
      }
    }
  }

  render() {
    const videoSearch = _.debounce(term => { // searching for video 300ms after user stopped typing
      this.videoSearch(term)
    }, 300)
    if (this.videoPl && this.videoPl.current && this.videoPl.current.childNodes.length > 0
        && this.videoPl.current.childNodes[0].childNodes.length > 0
        && this.videoPl.current.childNodes[0].childNodes[0].offsetHeight
    ) {
      console.log(this.videoPl.current.childNodes[0].childNodes[0].offsetHeight)
    }
    console.log(this.videoPl)
    console.log(this.state.playerHeight)

    const theme = createMuiTheme({
      palette: {
        type: "dark",
      },
    });

    return (
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Paper style={{maxWidth: 1200, margin: '0 auto', padding: 5}} elevation={3}>
            <Grid
                container
                alignItems="center"
                justify="center"
            >
              <Grid item>
                <SearchBar onSearchTermChange={videoSearch}/>
              </Grid>
              <Grid item>
                <ToggleButton
                    value="check"
                    selected={this.state.master}
                    size={'small'}
                    onChange={() => this.setState({master: !this.state.master})}
                >
                  <Typography variant="subtitle2">
                    Host
                  </Typography>
                  {this.state.master ?
                      <CheckBox
                          fontSize="small"
                          color="primary"/>
                      :
                      <CheckBoxOutlineBlank
                          fontSize="small"/>}
                </ToggleButton>
              </Grid>
            </Grid>

            <Grid container
                  direction="row"
                  justify="space-evenly"
                  alignItems="stretch"
                  spacing={1}>
              <VideoList
                  onVideoAdd={videoToAdd => this.onVideoAdd(videoToAdd)}
                  onVideoSelect={selectedVideo => this.onVideoSelect(selectedVideo)}
                  videos={this.state.videos.slice(0, window.innerWidth > 1080 ? 5 : 3)}/>
            </Grid>

            <Grid container style={{overflow: 'hidden', paddingTop: 16}} justify="center"
                  ref={this.videoPl}>
              <VideoDetail
                  onVideoEnds={(video, event) => this.onVideoEnds(video, event)}
                  geniusSongUrl={this.state.geniusSongUrl}
                  video={this.state.selectedVideo}/>
              <VideoPlaylist
                  playerHeight={this.state.playerHeight}
                  onRemoveSelect={selectedVideo => this.state.socket.emit('removeVideo',
                      selectedVideo)}
                  onVideoSelect={selectedVideo => this.onVideoSelect(selectedVideo)}
                  playlist={this.state.queue}/>
            </Grid>
          </Paper>
        </ThemeProvider>
    )
  }
}

export default App