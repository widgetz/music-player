import React from 'react';
import {MdAutorenew, MdFastForward, MdPause, MdPlayArrow} from 'react-icons/md'
import "../styles/MusicWidget.css"
import AudioTrack from "./AudioTrack";
import Playlist from "./Playlist";

class MusicWidget extends React.Component {
    constructor(props) {
        super(props);
        this.init();
        this.state = {
            isPlaying: false,
            sliderPos: 0,
            loop: false,
        };
    }

    init() {
        this.audioRef = React.createRef(); // need ref to change audio source
        this.playList = this.createPlayList(this.props.sourceMap);
        this.toggleLoop = this.toggleLoop.bind(this);
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
        return tracks;
    }

    playNow(audioTrack) {
        console.log(audioTrack)
        const audioPlayer = this.audioRef.current;
        audioPlayer.src = audioTrack.src;
        audioPlayer.play();
        this.setState({isPlaying: true, selected: audioTrack})
    }


    toggleAudio(track) {
        const audioPlayer = this.audioRef.current;
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            this.setState({isPlaying: false});
            return;
        }

        if (!audioPlayer.src && track) {
            audioPlayer.src = track.src;
            audioPlayer.play();
            this.setState({isPlaying: true});
        }
    }

    toggleLoop() {
        if (!this.state.loop) {
            this.playNext();
        }
        this.setState({loop: !this.state.loop})
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

    // todo: slider for seeking
    seeking(event) {
        this.audioRef.current.currentTime = event.target.value;
    }

    playing(event) {
        this.setState({sliderPos: event.target.currentTime})
    }

    ended() {
        if (this.state.loop) {
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
    //todo: to share state, have a scheduled poller to check for an event?
    //todo: to share state, lazy load?
    //todo: make a singleton? this will then be a store
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
                        <button className="circular-button media-button" onClick={this.toggleLoop}>
                            <MdAutorenew className="inner-icon"/>
                        </button>
                    </div>
                </div>
                <Playlist trackList={this.createPlayList(this.props.sourceMap)} select={[this.toggleAudio, this.playNow]}/>
            </div>
        )
    }
}

export default MusicWidget;
