import React from "react";

import './App.css';
import MusicWidget from "./components/MusicWidget";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MusicWidget />
      </div>
    );
  }
}

export default App;