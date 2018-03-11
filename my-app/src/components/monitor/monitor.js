import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './monitor.scss';
import Form from '../form/form';
import Flight from '../flight/flight';
import axios from 'axios';

class Monitor extends Component {
  constructor (props) {
    super(props);
    this.state = {flights: []};

    this.submit = this.submit.bind(this);
  }

  submit (data) {
    axios.get('/api/', {
      params: {
        city: data.city,
        status: data.status
      }
    })
      .then((response) => {
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
          {this.state.flights.map((flight, index) => <div key={"content" + flight._id} className="content"><Flight key={flight._id} data={flight}/></div>)}

      </div>
    );
  }
}

export default Monitor;
