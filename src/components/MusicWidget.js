import React from 'react';
import PropTypes from 'prop-types';
import {MdPlayArrow, MdFastForward} from 'react-icons/md'

import "../styles/MusicWidget.css"

class MusicWidget extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="music-widget-container">

            <div>
              <button className="circular-button fast-forward-button mirror-content" onClick={()=>{}}>
                <MdFastForward className="inner-icon"/>
              </button>
            </div>

            <div className="play-button-spacing">
              <button className="circular-button play-button" onClick={()=>{}}>
                <MdPlayArrow className="inner-icon"/>
              </button>
            </div>

            <div>
              <button className="circular-button fast-forward-button play-button" onClick={()=>{}}>
                <MdFastForward className="inner-icon"/>
              </button>
            </div>


        </div>
    )
  }
}

export default MusicWidget;

MusicWidget.propTypes = {
};