import React, { Component } from 'react';
import './App.scss';
import Form from './components/form/form';

class App extends Component {

  render() {
    return (
      <div className="App">

        <div className="header">
          
          <div className="name">
            <label>Онлайн табло</label>
          </div>          
          
          <div className="search">
            <Form/>
          </div>

        </div>
        
        <div className="content">

        </div>
      </div>
    );
  }
}

export default App;
