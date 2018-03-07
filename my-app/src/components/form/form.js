import React, { Component } from 'react';
import './form.scss';

class Form extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      city: '',
      status: '',
      data:'',
      options: [
        {value:'', label:''},
        {value: '0', label:'Посадка'},
        {value: '1', label:'Взлет'},
        {value: '2', label:'В пути'},
        {value: '3', label:'Приземлился'},
        {value: '4', label:'Задержан'}
      ]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCity   = this.handleCity.bind(this);
    this.handleStatus = this.handleStatus.bind(this);

  }

  async handleCity (event) {
    await this.setState({city: event.target.value});
    this.props.onSubmit(this.state);
  }

  async handleStatus (event) {
    await this.setState({status: event.target.value});
    this.props.onSubmit(this.state);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  makeOption (option, index) {
    return <option key={index} value={option.value}>{option.label}</option>;
  };

  render() { 
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="search">
          <label>Введите город:
            <input type="text" value={this.state.city} onChange={this.handleCity}/>
          </label>
        </div>
        <div className="search">
          <label>Статус рейса:
            <select value={this.state.status} onChange={this.handleStatus}>
              {this.state.options.map(this.makeOption)}
            </select>
          </label>
        </div>
        <div className="search">
          <input id="search" type="submit" value="Искать"/>
        </div>
      </form>
    )
  }
}

Form.propTypes = {}

Form.defaultProps = {}

export default Form
