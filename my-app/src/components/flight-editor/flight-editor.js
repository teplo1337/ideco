import React, { Component } from 'react';
import './flight-editor.scss';
import Moment from 'moment';
import axios from 'axios';

class FlightEditor extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: props.data
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeFor = this.handleChangeFor.bind(this);
    
  }

  handleSave(event) {
    event.preventDefault();
    for (let prop in this.state.data) {
      if (!prop) { return false }
    }
    this.saveFlight(this.state.data);
  }

  handleSubmit(event) {
    event.preventDefault();
    for (let prop in this.state.data) {
      if (!prop) { return false }
    }
    this.saveFlight(this.state.data);
  }

  handleDelete(event) {
    event.preventDefault();
    this.deleteFlight(this.state.data);
  }

  saveFlight (data) {
    axios.put('/api/', data)
      .then((response) => {
      });
  }

  deleteFlight (data) {
    axios.delete('/api/' + data._id)
      .then((response) => {
      });
    this.props.delete(data);
  }

  handleChangeFor = (propertyName, ) => (event) => {    
    const key1 = propertyName.split('.')[0];
    const key2 = propertyName.split('.')[1];

    const newData = this.state.data;

    if (key2) {
      newData[key1][key2] = event.target.value;
    } else {
      newData[key1] = event.target.value;
    }
    this.setState({data: newData});
  }

  render() {
    return (
      <form className="flight-form" onSubmit={this.handleSubmit}>
        <div className="dest">
          <div className="dest__block">
            <input type="text" className="city" onChange={this.handleChangeFor('takeoff.city')} value={this.state.data.takeoff.city}/>
            <input type="text" className="airport" onChange={this.handleChangeFor('takeoff.airport')} value={this.state.data.takeoff.airport}/>
            <input type="datetime-local" className="time" onChange={this.handleChangeFor('takeoff.time')} value={this.state.data.takeoff.time}/>
          </div>
          <div className="info">
          <input type="text" className="flight" onChange={this.handleChangeFor('name')} value={this.state.data.name}/>
            <div className="arrow">
            &#9992;
            </div>
            <select type="text" className="status" onChange={this.handleChangeFor('status')} value={this.state.data.status}>
              <option value=""></option>;
              <option value="0">Посадка</option>;
              <option value="1">Взлет</option>;
              <option value="2">В пути</option>;
              <option value="3">Приземлился</option>;
              <option value="4">Задержан</option>;
            </select>   
          </div>
          <div className="dest__block">
            <input type="text" className="city" onChange={this.handleChangeFor('landing.city')} value={this.state.data.landing.city}/>
            <input type="text" className="airport" onChange={this.handleChangeFor('landing.airport')} value={this.state.data.landing.airport}/>
            <input type="datetime-local" className="time" onChange={this.handleChangeFor('landing.time')} value={this.state.data.landing.time}/>
          </div>
        </div>
        <input className="save" type="button" onClick={this.handleSave} value="Сохранить"/>
        <input className="delete" type="button" onClick={this.handleDelete} value="Удалить"/>
      </form>
    )
  }
}

FlightEditor.propTypes = {};

FlightEditor.defaultProps = {};

export default FlightEditor;
