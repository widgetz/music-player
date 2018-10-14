import React, {Component} from "react";
import AudioTrack from "../model/AudioTrack"

export default class TrackItem extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    event.preventDefault();
    this.props.onClick(new AudioTrack(event.target.innerHTML, event.target.href));
  }
  render() {
    return <a href={this.props.src} onClick={this.handleClick}>{this.props.name} </a>
  }
}