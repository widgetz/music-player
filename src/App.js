    import React from "react";
import './App.css';
import MusicWidget from "./components/MusicWidget";
import arrow from "./audio/arrow_x.wav";
import baseball from "./audio/baseball_hit.wav";
import boing from "./audio/boing_x.wav";

class App extends React.Component {

  render() {
    const songs = new Map();
    songs.set('arrow', arrow);
    songs.set('baseball', baseball);
    songs.set('boing', boing);
    return (

      <div className="App"  style={{marginTop: "250px"}}>
        <MusicWidget sourceMap={songs} />
      </div>
    );
  }
}

export default App;
