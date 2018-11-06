import React, {Component} from "react";
import AudioTrack from "./AudioTrack";

export default class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: undefined
        }
    }

    hasSong() {
        return this.state.current !== undefined;
    }

    next() {
        if (!this.hasSong()) {
            this.setState({current: 0});
            return;
        }
        this.setState({current: (this.state.current + 1) % this.size()});
    }

    previous() {
        if (!this.hasSong()) {
            this.setState({current: 0});
            return;
        }
        const prev = this.state.current - 1;
        this.setState({current:  prev < 0 ? this.size() - 1 : prev});
    }

    size() {
        return this.trackList.length;
    }

    // todo: consider using AudioTrack as the model passed around
    render() {
        return <div className="playlist">
            <ul>
                {
                    this.props.trackList.map((audioTrack, trackNum) =>
                        <li key={trackNum}
                            className={this.state.current === trackNum ? "track__current" : ""}>
                            <AudioTrack onClick={() => this.props.select(audioTrack)} track={audioTrack}/>
                        </li>
                    )
                }
            </ul>
        </div>
    }
}
