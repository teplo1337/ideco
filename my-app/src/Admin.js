import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Admin.scss';
import Form from './components/form/form';
import FlightEditor from './components/flight-editor/flight-editor';
import axios from 'axios';

class Admin extends Component {
  constructor (props) {
    super(props);
    this.state = {flights: []};

    this.submit = this.submit.bind(this);
    this.deleteFlight = this.deleteFlight.bind(this);
  }

  submit (data) {
    this.setState({filter: data});
    axios.get('/api/', {
      params: {
        city: data.city,
        status: data.status
      }
    })
      .then((response) => {
        console.log(response.data)
        this.setState({flights: response.data});
      });   
  }

  deleteFlight (data) {
   this.submit(this.state.filter);
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
        {this.state.flights.map(flight => 
          <div className="content">
          <FlightEditor delete={this.deleteFlight} data={flight}/>
        </div>)}

      </div>
    );
  }
}

export default Admin;
