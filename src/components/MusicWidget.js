import React from 'react';
import "../styles/MusicWidget.css"
import AudioTrack from "../model/AudioTrack";
import TrackItem from "./TrackItem";

class MusicWidget extends React.Component {
  constructor(props) {
    super(props);
    this.tracks = [];
    this.audioRef = React.createRef(); // need ref to change audio source
    this.toggleAudio = this.toggleAudio.bind(this);
    this.playNow = this.playNow.bind(this);
    this.createPlayButton = this.createPlayButton.bind(this);
    this.ended = this.ended.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
    this.createTracks(props.sourceMap);
    this.state = {
      isPlaying: false
    };
  }

  createTracks(sources = new Map()) {
    sources.forEach((src, name) => {
      this.tracks.push(new AudioTrack(name, src))
    })
  }

  renderPlaylist() {
   return  this.tracks.map((audioTrack, index) =>
        <TrackItem key={index} onClick={this.playNow} src={audioTrack.src} name={audioTrack.name}/>
    );
  }

  createPlayButton() {
    return (
      <button className="circular-button" onClick={this.toggleAudio}>
        {this.state.isPlaying ? <span>&#9612;&#9612;</span> : <span>&#x25b6;</span>}
      </button>
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
          {this.createPlayButton()}
          <audio ref={this.audioRef} src={this.props.sourceMap.get('arrow')} onEnded={this.ended}/>
          {this.renderPlaylist()}
        </div>
    )
  }
}

export default MusicWidget;

MusicWidget.propTypes = {
};