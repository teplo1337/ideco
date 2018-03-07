import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Monitor.scss';
import Form from './components/form/form';
import Flight from './components/flight/flight';
import axios from 'axios';

class Monitor extends Component {
  constructor (props) {
    super(props);
    this.state = {flights: []};

    this.submit = this.submit.bind(this);
  }

  submit (data) {
    console.log(data)
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

  render() {
    return (
      <div className="Monitor">
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
          {this.state.flights.map(flight => <div className="content"><Flight data={flight}/></div>)}

      </div>
    );
  }
}

export default Monitor;
