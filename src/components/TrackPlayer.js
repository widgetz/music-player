import React, {Component} from "react";

export default class TrackPlayer extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onClick(this.props.audioTrack);
  }

  render() {
    return <a className={this.props.className} href={this.props.audioTrack.src} onClick={this.handleClick}>{this.props.audioTrack.name} </a>
  }
}