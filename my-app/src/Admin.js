import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Admin.scss';
import Form from './components/form/form';
import FlightEditor from './components/flight-editor/flight-editor';

class Admin extends Component {
  constructor (props) {
    super(props);
    this.state = {flights: []};

    this.submit = this.submit.bind(this);
  }

  submit (data) {
    
    data.map((flight) => console.log(flight));
    this.setState({flights: data});
  }

  render() {
    return (
      <div className="Admin">
        <div className="nav">
          <Link to="/"><button>Monitor</button></Link>
          <Link to="/adm"><button>Admin</button></Link>
        </div>

        <div className="header">
          
          <div className="name">
            <h1>Онлайн табло</h1>
            <p>Выбрано рейсов: {this.state.flights.length}</p>
          </div>          
          
          <div className="search">
            <Form onSubmit={this.submit}/>
          </div>

        </div>        
          {this.state.flights.map(flight => <div className="content"><FlightEditor data={flight}/></div>)}

      </div>
    );
  }
}

export default Admin;
