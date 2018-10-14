import React from 'react';
import {MdFastForward, MdPlayArrow} from 'react-icons/md'
import "../styles/MusicWidget.css"
import AudioTrack from "../model/AudioTrack";
import TrackItem from "./TrackItem";

class MusicWidget extends React.Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      isPlaying: false
    };
  }

  init(){
    this.audioRef = React.createRef(); // need ref to change audio source
    this.tracks = this.createTracks(this.props.sourceMap);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.playNow = this.playNow.bind(this);
    this.createPlayButton = this.createPlayButton.bind(this);
    this.ended = this.ended.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
  }

  createPlayButton() {
    return (
      <button className="circular-button" onClick={this.toggleAudio}>
        {this.state.isPlaying ? <span>&#9612;&#9612;</span> : <span>&#x25b6;</span>}
      </button>
    );
  }

  createTracks(sources = new Map()) {
    const tracks = [];
    sources.forEach((src, name) => {
      tracks.push(new AudioTrack(name, src))
    });
    return tracks;
  }

  renderPlaylist() {
   return  this.tracks.map((audioTrack, index) =>
        <TrackItem key={index} onClick={this.playNow} audioTrack={audioTrack}/>
    );
  }

  playNow(audioTrack) {
    const audioPlayer = this.audioRef.current;
    audioPlayer.src = audioTrack.src;
    audioPlayer.play();
    this.setState({isPlaying: true})
  }

  // TODO: play button should only toggle
  // logic for toggling  audio should not exist here
  // the func that determines if audio exist should also
  // emit event when no audio is available
  toggleAudio() {
    const audioPlayer = this.audioRef.current;
    if (!audioPlayer.paused) {
      audioPlayer.pause();
      this.setState({isPlaying: false});
      return;
    }
    // TODO: this would be registered to an event when no audio src exist
    if (!audioPlayer.src && this.tracks.length > 0) {
      const audioTrack = this.tracks[0];
      audioPlayer.src = audioTrack.src;
    } else if (this.tracks.length <= 0) {
      return;
    }
    audioPlayer.play();
    this.setState({isPlaying: true});
  }


  // TODO: implement seek? use HTMLMediaElement.currentTime + slider?
  seeking(event) {

  }

  ended() {
    this.setState({isPlaying: false})
  }

  render() {
    return (
        <div>
          <audio ref={this.audioRef} onEnded={this.ended}/>
          {this.createPlayButton()}
          {this.renderPlaylist()}
          <div className="music-widget-container">

            <div>
              <button className="circular-button fast-forward-button mirror-content" onClick={() => {
              }}>
                <MdFastForward className="inner-icon"/>
              </button>
            </div>

            <div className="play-button-div">
              <button className="circular-button play-button" onClick={()=>{}}>
                <MdPlayArrow className="inner-icon"/>
              </button>
            </div>

            <div>

              <button className="circular-button fast-forward-button" onClick={()=>{}}>
                <MdFastForward className="inner-icon"/>
              </button>
            </div>
          </div>
        </div>
    )
  }
}

export default MusicWidget;
