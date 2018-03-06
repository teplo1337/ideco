import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Form extends Component {

  constructor(props) {
    super(props);
    
    this.state = {city: '', status: '', data:''};

    this.state.options = [
      {value:'', label:''},
      {value:'0', label:'Посадка'},
      {value:'1', label:'Взлет'},
      {value:'2', label:'В пути'},
      {value:'3', label:'Приземлился'},
      {value:'4', label:'Задержан'}
    ]

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCity   = this.handleCity.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
  }

  handleCity (event) {
    this.setState({city: event.target.value});
  }

  handleStatus (event) {
    this.setState({status: event.target.value});
  }

  handleSubmit(event) {
    console.log('u write:' + this.state.city + ' and ' + this.state.status);
    event.preventDefault();
    this.sendRequest();
  }

  makeOption (option, index) {
    return <option key={index} value={option.value}>{option.label}</option>;
  };

  sendRequest () {
    axios.get('/api/', {params: {city: this.state.city, status: this.state.status}})
      .then((response) => {
        this.setState({data: response.data})
        console.log(this.state.data);
      });
  }

  render() { 
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search__city">
          <label><input type="text" value={this.state.city} onChange={this.handleCity}/></label>
        </div>
        <div className="search__status">
          <label>Статус рейса            
            <select value={this.state.status} onChange={this.handleStatus}>
              {this.state.options.map(this.makeOption)}
            </select>;
          </label>
        </div>
        <input type="submit" value="Искать"/>
      </form>
    )
  }
}

Form.propTypes = {}

Form.defaultProps = {}

export default Form
