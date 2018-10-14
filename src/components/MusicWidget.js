import React from 'react';
import PropTypes from 'prop-types';
import Audio from "./Audio";
import "../styles/MusicWidget.css"

class MusicWidget extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <Audio/>
          <button className="circular-button">50%</button>
        </div>
    )
  }
}

export default MusicWidget;

MusicWidget.propTypes = {
};