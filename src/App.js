import React, { Component } from 'react';
import Content from './components/Content';
import Places from './components/Places';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Content />
        <Places />
      </div>
    );
  }
}

export default App;
