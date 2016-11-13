import React, { Component } from 'react';

import Clock from './clock/Clock';

class App extends Component {

  render() {
    return (
      <div className="mainWrapper">
        <Clock/>
      </div>
    );
  }
}

export default App;
