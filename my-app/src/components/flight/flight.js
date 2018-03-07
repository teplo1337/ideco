import React, { Component } from 'react';
import './flight.scss';
import Moment from 'moment';

class Flight extends Component {

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

  render() {
    return (
      <div className="dest">
        <div className="dest__block">
          <h1 className="city">
            {this.props.data.takeoff.city}
          </h1>
          <h2 className="airport">
            {this.props.data.takeoff.airport}          
          </h2>
          <h3 className="time">
            {this.changeDateFormat(this.props.data.takeoff.time)}            
          </h3>        
        </div>
        <div className="info">
          <h1 className="flight">
          {this.props.data.name}
          </h1>
          <div className="arrow">
          &#9992;
          </div>
          <div className="status">
          {this.convertToStatus(this.props.data.status)}
          </div>        
        </div>
        <div className="dest__block">
          <div className="city">
            {this.props.data.landing.city}
          </div>
          <div className="airport">
            {this.props.data.landing.airport}          
          </div>
          <div className="time">
            {this.changeDateFormat(this.props.data.landing.time)}
          </div>        
        </div>
      </div>
    )
  }
}

Flight.propTypes = {};

Flight.defaultProps = {};

export default Flight;
