import React, { Component } from 'react';
import './flight-editor.scss';
import Moment from 'moment';
import axios from 'axios';

class FlightEditor extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      data: props.data
    }
  }

  changeDateFormat (date) {
    Moment.locale('ru');
    return Moment(date).format('HH:mm D MMM');
  }

  convertToStatus (number) {
    const options = [
      {value: '', label:''},
      {value: 0, label:'Посадка'},
      {value: 1, label:'Взлет'},
      {value: 2, label:'В пути'},
      {value: 3, label:'Приземлился'},
      {value: 4, label:'Задержан'}
    ];
    return options.map((status) => {
      if (status.value === number) {
        return status.label;
      }      
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    for (let prop in this.state.data) {
      if (!prop) { return false }
    }
    this.saveFlight(this.state.data);
  }

  saveFlight (data) {
    axios.put('/api/', data)
      .then((response) => {
        console.log('OK', response);
      });
  }

  makeOptions () {
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="dest">
          <div className="dest__block">
            <input type="text" className="city" value={this.state.data.takeoff.city}/>
            <input type="text" className="airport" value={this.state.data.takeoff.airport}/>
            <input type="datetime-local" className="time" value={this.state.data.takeoff.time}/>
          </div>
          <div className="info">
          <input type="text" className="flight" value={this.state.data.name}/>
            <div className="arrow">
            &#9992;
            </div>
            <select type="text" className="status" value={this.state.data.status}>
              <option value=""></option>;
              <option value="0">Посадка</option>;
              <option value="1">Взлет</option>;
              <option value="2">В пути</option>;
              <option value="3">Приземлился</option>;
              <option value="4">Задержан</option>;
            </select>   
          </div>
          <div className="dest__block">
            <input type="text" className="city" value={this.state.data.landing.city}/>
            <input type="text" className="airport" value={this.state.data.landing.airport}/>
            <input type="datetime-local" className="time" value={this.state.data.landing.time}/>
          </div>
        </div>
        <input className="save" type="submit" value="Сохранить"/>
      </form>
    )
  }
}

FlightEditor.propTypes = {};

FlightEditor.defaultProps = {};

export default FlightEditor;
