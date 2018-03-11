import React, { Component } from 'react';
import './flight-editor.scss';

const Buttons = (props) => {
  let buttons = [];
  const saveButton   = <input className="save" key="key1"type="button" onClick={props.save} value="Сохранить"/>,
        resetButton  = <input className="reset" key="key2"type="button" onClick={props.reset} value="Сброс"/>,
        deleteButton = <input className="delete" key="key3"type="button" onClick={props.delete} value="Удалить"/>,
        createButton = <input className="create" key="key4"type="button" onClick={props.create} value="Создать"/>;

  if (props.isCreate) {
    buttons = [createButton, resetButton];
  } else {
    buttons = [saveButton, deleteButton];
  }
  return (
    <div>{buttons}</div>
  );
}

class FlightEditor extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: props.data
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreate = this.handleCreate.bind(this)
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.handleChangeFor = this.handleChangeFor.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    
  }

  componentWillReceiveProps (nextProps) {
    
    if (nextProps.isCreate === true) {
      this.setState({data: this.props.data});
    }   
  }

  handleReset () {
     this.setState({data: {"_id":"","name":"","takeoff":{"time":"","fact_time":"","city":"","airport":""},"landing":{"time":"","fact_time":"","city":"","airport":""},"status":"","type": ""}});
  }

  handleCreate() {
    this.props.onCreate(this.state.data);
    this.handleReset ();
  }

  handleSave() {
    this.props.onSave(this.state.data);
  }

  handleDelete() {
    this.props.onDelete(this.state.data);
  }

  handleSubmit() {
    this.handleSave();
  }

  handleChangeFor = (propertyName, ) => (event) => {    
    const key1 = propertyName.split('.')[0],
    key2 = propertyName.split('.')[1],
    newData = this.state.data;

    if (key2) {
      newData[key1][key2] = event.target.value;
    } else {
      newData[key1] = event.target.value;
    }
    this.setState({data: newData});
  }

  render() {
    console.log()
    return (
      <form className="flight-form" ref="flightForm" onSubmit={this.handleSubmit}>
        <div className="dest">
        
          <div className="dest__block">
            <input type="text" className="city" placeholder="Город вылета" onChange={this.handleChangeFor('takeoff.city')} value={this.state.data.takeoff.city}/>
            <input type="text" className="airport" placeholder="Аэропорт вылета" onChange={this.handleChangeFor('takeoff.airport')} value={this.state.data.takeoff.airport}/>
            <input type="datetime-local" className="time" onChange={this.handleChangeFor('takeoff.time')} value={this.state.data.takeoff.time}/>
            <label className="fact_time">Фактическое время:</label><input type="datetime-local" className="fact_time" onChange={this.handleChangeFor('takeoff.fact_time')} value={this.state.data.takeoff.fact_time}/>
          </div>

          <div className="info">
            <input type="text" className="flight" placeholder="Номер рейса" onChange={this.handleChangeFor('name')} value={this.state.data.name}/>

            <div className="arrow">
              &#9992;
            </div>

            <div className="type">
              <input type="text" className="type" placeholder="Тип самолета" onChange={this.handleChangeFor('type')} value={this.state.data.type}/>
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
            <input type="text" className="city" placeholder="Город посадки" onChange={this.handleChangeFor('landing.city')} value={this.state.data.landing.city}/>
            <input type="text" className="airport" placeholder="Аэропорт посадки" onChange={this.handleChangeFor('landing.airport')} value={this.state.data.landing.airport}/>
            <input type="datetime-local" className="time" onChange={this.handleChangeFor('landing.time')} value={this.state.data.landing.time}/>
            <label className="fact_time">Фактическое время:</label><input type="datetime-local" className="fact_time" onChange={this.handleChangeFor('landing.fact_time')} value={this.state.data.landing.fact_time}/>
          </div>
          
        </div>

        <Buttons 
          save={this.handleSave} 
          create={this.handleCreate}
          delete={this.handleDelete}
          reset={this.handleReset}
          isCreate={this.props.isCreate} />
      </form>
    )
  }
}

FlightEditor.propTypes = {};

FlightEditor.defaultProps = {
  data: {"_id":"","name":"","takeoff":{"time":"","fact_time":"","city":"","airport":""},"landing":{"time":"","fact_time":"","city":"","airport":""},"status":"","type": ""}
};

export default FlightEditor;
