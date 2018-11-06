import React, {Component} from "react";

export default class AudioTrack extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.select(this.props.track);
    }

    render() {
        return <a className={this.props.className || ""} href={this.props.track.src || ""}
                  onClick={this.handleClick}>{this.props.track.name} </a>
    }
}
