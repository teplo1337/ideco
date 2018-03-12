import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './admin.scss';
import Form from '../form/form';
import FlightEditor from '../flight-editor/flight-editor';
import axios from 'axios';

class Admin extends Component {
  constructor (props) {
    super(props);

    this.state = {flights: []};

    this.readFlights = this.readFlights.bind(this);
    this.createFlight = this.createFlight.bind(this);
    this.saveFlight = this.saveFlight.bind(this);
    this.deleteFlight = this.deleteFlight.bind(this);
  }

  readFlights (data) {
    this.setState({filter: data});
    axios.get('/api/', {
      params: {
        city: (data) ? data.city: '',
        status: (data) ? data.status: ''
      }
    })
      .then((response) => {    
        this.setState({flights: response.data});
      });   
  }

  createFlight (data) {
    const createBlock = ReactDOM.findDOMNode(this.refs.content);
    axios.post('/api/', data)
      .then( async (response) => {
        
        await this.setState({createData : {"_id":"","name":"","takeoff":{"time":"","fact_time":"","city":"","airport":""},"landing":{"time":"","fact_time":"","city":"","airport":""},"status":"","type": ""}});
        createBlock.classList.add("success");
        createBlock.addEventListener('click', () => createBlock.classList.remove("success"));
        this.readFlights(this.state.filter);
      }, (err) => {
        
        this.setState({createData: data});
        createBlock.classList.add("wrn");
        createBlock.addEventListener('click', () => createBlock.classList.remove("wrn"));
        
      }
    );      
  }

  saveFlight (data) {
    axios.put('/api/', data)
      .then((response) => {
        this.readFlights(this.state.filter);
      });
  }

  deleteFlight (data) {
    axios.delete('/api/' + data._id)
      .then((response) => {
        this.readFlights(this.state.filter);
      });
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
            <Form onSubmit={this.readFlights}/>
          </div>
        </div>

        <div className="content" key="contentCreate" ref="content">
          <FlightEditor key="contentCreateEditor" isCreate={true} data={this.state.createData} onCreate={this.createFlight}  />
        </div>  
        {this.state.flights.map((flight, index) => 
          <div className="content" key={"content" + flight._id}>
            <FlightEditor onDelete={this.deleteFlight} key={flight._id} onSave={this.saveFlight} data={flight} />
          </div>
        )}

      </div>
    );
  }
}

export default Admin;
