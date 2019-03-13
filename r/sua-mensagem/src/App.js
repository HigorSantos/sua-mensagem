import React, { Component } from 'react';
import Topo from './Topo';
import Rodape from './Rodape';
import Editor from './Editor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Topo />
        <Editor />
        <Rodape />
      </div>
    );
  }
}

export default App;
