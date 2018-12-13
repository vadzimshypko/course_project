import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { sizeField: 2, nowTime: 0 };

    // Привязка необходима, чтобы сделать this доступным в коллбэке
    this.onIncrease = this.onIncrease.bind(this);
    this.onDecrease = this.onDecrease.bind(this);
    this.onChangeSizeField = this.onChangeSizeField.bind(this);
    this.createMineField = this.createMineField.bind(this);
    this.onUpdateTime = this.onUpdateTime.bind(this);

    setInterval(this.onUpdateTime, 1000);
  }

  onIncrease() {
    this.setState({
      sizeField: parseInt(this.state.sizeField, 0) + 1,
      nowTime: this.state.nowTime
    });
  }

  onDecrease() {
    this.setState({
      sizeField: parseInt(this.state.sizeField, 0) - 1,
      nowTime: this.state.nowTime
    });
  }

  onChangeSizeField(event) {
    this.setState({
      sizeField: event.target.value !== "" ? event.target.value : 0,
      nowTime: this.state.nowTime
    });
  }

  createMineField() {
    if (this.state.sizeField < 2) {
      console.log("Поле слишком маленькое, введите значение больше 1");
    } else if (this.state.sizeField > 10) {
      console.log("Поле слишком большое, введите значение меньше 11");
    } else {
      console.log("Coздать поле");
    }
  }

  onUpdateTime() {
    this.setState({
      sizeField: this.state.sizeField,
      nowTime: this.state.nowTime + 1
    });
  }

  render() {
    return (
      <div className="App">
        <p>
          <h>Прошло {this.state.nowTime} секунд с начала</h>
          <h2>Размер минного поля: {this.state.sizeField}</h2>
          <button onClick={this.onDecrease}>-</button>
          <input
            type="number"
            value={this.state.sizeField}
            onChange={this.onChangeSizeField}
          />
          <button onClick={this.onIncrease}>+</button>
        </p>
        <button onClick={this.createMineField}>Созать минное поле</button>
      </div>
    );
  }
}

export default App;
