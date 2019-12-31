import React, {Component} from 'react'
import SearchBar from './search_bar'
import VideoList from './video_list'
import VideoPlaylist from './video_playlist'
import VideoDetail from './video_detail'
import _ from 'lodash'
import YouTubeSearch from 'youtube-search'
import axios from 'axios'
import socketIOClient from 'socket.io-client'

const GENIUS_API_KEY = 'DncOPjHRnMOPSe3Yzl56lpCsIah0zalJ-u9UjhWetfuaZ_4lsaA6RYhDsZSTEkWK'
const YOUTUBE_API_KEY = 'AIzaSyA3WXaElbsOKbgao3Sf5-AZf5IspMTH9pw'

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
      master: false
    }
  }

  async componentDidMount() {
    console.log('START')
    let socket;
    // if (process.env.PORT) {
      socket = await socketIOClient()
    // } else {
    //   socket = await socketIOClient('http://localhost:4000')
    // }
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
      if (addAsNext)
      this.state.socket.emit('addAsNext', videoToAdd)
      else
      this.state.socket.emit('addNewVideo', videoToAdd)
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
        this.setState({videos: videos.slice(0, 3)}) //there's a bug and you got one item less in response so i'm requesting one more
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

  onRemoveSelect(videoToRemove) { // this function is searching for provided video and is deleting this one from playlist
    this.setState({queue: _.without(this.state.queue, videoToRemove)})
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

    return (
        <div>
          <SearchBar onSearchTermChange={videoSearch}/>
          <VideoList
              onVideoAdd={videoToAdd => this.onVideoAdd(videoToAdd)}
              onVideoSelect={selectedVideo => this.onVideoSelect(selectedVideo)}
              videos={this.state.videos}/>
          <div className="columns">
            <VideoDetail
                onVideoEnds={(video, event) => this.onVideoEnds(video, event)}
                geniusSongUrl={this.state.geniusSongUrl}
                video={this.state.selectedVideo}/>
            <div className="column is-one-third video-playlist">
              {this.state.queue.length > 0 &&
              <button onClick={() => this.setState({master: !this.state.master})}>
                Master mode {this.state.master ? 'on' : 'off'}
              </button>}
              <VideoPlaylist
                  onRemoveSelect={selectedVideo => this.state.socket.emit('removeVideo',
                      selectedVideo)}
                  onVideoSelect={selectedVideo => this.onVideoSelect(selectedVideo)}
                  playlist={this.state.queue}/>
            </div>
          </div>
        </div>
    )
  }
}

export default App