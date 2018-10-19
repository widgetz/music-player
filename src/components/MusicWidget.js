import React from 'react';
import {MdAutorenew, MdFastForward, MdPause, MdPlayArrow} from 'react-icons/md'
import "../styles/MusicWidget.css"
import AudioTrack from "../model/AudioTrack";
import TrackPlayer from "./TrackPlayer";
import PlayList from "../service/PlayList";

class MusicWidget extends React.Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      isPlaying: false,
      sliderPos: 0,
      autoPlay: false,
    };
  }

  init(){
    this.audioRef = React.createRef(); // need ref to change audio source
    this.playList = this.createPlayList(this.props.sourceMap);
    this.toggleAutoPlay = this.toggleAutoPlay.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.playNow = this.playNow.bind(this);
    this.playing = this.playing.bind(this);
    this.ended = this.ended.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrev = this.playPrev.bind(this);
  }

  createPlayList(sources = new Map()) {
    const tracks = [];
    sources.forEach((src, name) => {
      tracks.push(new AudioTrack(name, src))
    });
    return new PlayList(tracks);
  }

  playNow(trackNum) {
    const audioPlayer = this.audioRef.current;
    audioPlayer.src = this.playList.play(trackNum).src;
    audioPlayer.play();
    this.setState({isPlaying: true, selected: trackNum})
  }


  toggleAudio() {
    const audioPlayer = this.audioRef.current;
    if (!audioPlayer.paused) {
      audioPlayer.pause();
      this.setState({isPlaying: false});
      return;
    }
    if (!audioPlayer.src) {
      audioPlayer.src = this.playList.playNext().src;
    }
    audioPlayer.play();
    this.setState({isPlaying: true});
  }

  toggleAutoPlay() {
    if (!this.state.autoPlay) {
      this.playNext()
    }
    this.setState({autoPlay: !this.state.autoPlay})
  }

  playNext() {
    const audioPlay = this.audioRef.current;
    audioPlay.src = this.playList.playNext().src;
    audioPlay.play();
    this.setState({isPlaying: true});
  }

  playPrev() {
    const audioPlay = this.audioRef.current;
    audioPlay.src = this.playList.playPrevious().src;
    audioPlay.play();
    this.setState({isPlaying: true})
  }

  seeking(event) {
    this.audioRef.current.currentTime = event.target.value;
  }

  playing(event) {
    this.setState({sliderPos: event.target.currentTime})
  }

  ended() {
    if (this.state.autoPlay) {
      this.playNext();
    } else {
      this.setState({isPlaying: false})
    }
  }

  //todo: compare song names?
  isPlaying(currentSongIndex) {
    return this.playList.getCurrent() === currentSongIndex;
  }

  //TODO: Make the media controls a component
  //TODO: Make a playlist component or make the PlayList service into a component
  render() {
    return (
        <div>
          <audio ref={this.audioRef} onTimeUpdate={this.playing} onEnded={this.ended}/>
          <div className="music-widget-container">
            <div>
              <button className="circular-button fast-forward-button mirror-content" onClick={this.playPrev}>
                <MdFastForward className="inner-icon"/>
              </button>
            </div>

            <div className="play-button-div">
              <button className="circular-button play-button" onClick={this.toggleAudio}>
                {
                  this.state.isPlaying ?
                    <MdPause className="inner-icon"/> :
                    <MdPlayArrow className="inner-icon"/>
                }
              </button>
            </div>
            <div>
              <button className="circular-button fast-forward-button" onClick={this.playNext}>
                <MdFastForward className="inner-icon"/>
              </button>
            </div>
            <div>
              <button className="circular-button media-button" onClick={this.toggleAutoPlay}>
                <MdAutorenew className="inner-icon"/>
              </button>
            </div>
          </div>
          <div className="playlist">
            <ul>
              {
                // todo: if the data structure is not an array this breaks
                this.playList.getPlaylist().map((audioTrack, trackNum) =>
                  <li key={trackNum} className={this.isPlaying(trackNum) && this.state.isPlaying ? "track__current" : ""}>
                    <TrackPlayer onClick={() => this.playNow(trackNum)} audioTrack={audioTrack}/>
                  </li>)
              }
            </ul>
          </div>
        </div>
    )
  }
}

export default MusicWidget;
