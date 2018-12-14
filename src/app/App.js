import React, { Component } from "react";
import "./App.css";
import Field from "./field/Field";
import { Button, Input } from "semantic-ui-react";
import styled from "styled-components";

const Header = styled.header`
  background-color: #282c34;
  display: flex;
  min-height: 80px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  font-size: calc(50px + 2vmin);
  color: green;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeField: 100,
      createFieldTouched: false
    };

    this.onIncrease = this.onIncrease.bind(this);
    this.onDecrease = this.onDecrease.bind(this);
    this.onChangeSizeField = this.onChangeSizeField.bind(this);
    this.createMineField = this.createMineField.bind(this);
  }

  onIncrease() {
    this.setState({ sizeField: parseInt(this.state.sizeField, 0) + 1 });
  }

  onDecrease() {
    this.setState({ sizeField: parseInt(this.state.sizeField, 0) - 1 });
  }

  onChangeSizeField(event) {
    this.setState({
      sizeField: event.target.value !== "" ? event.target.value : 0
    });
  }

  createMineField() {
    if (this.state.sizeField < 2) {
      console.log("Поле слишком маленькое, введите значение больше 1");
    } else {
      this.setState({ createFieldTouched: true });
    }
  }

  onClearField = () => {
    this.setState({ createFieldTouched: false });
  };

  render() {
    return (
      <div className="app">
        <Header>Жизнь</Header>
        <h2>Размер поля: {this.state.sizeField}</h2>
        <div>
          <Button color="green" className="button" onClick={this.onDecrease}>
            -
          </Button>
          <Input
            className="input-field"
            type="number"
            value={this.state.sizeField}
            onChange={this.onChangeSizeField}
          />
          <Button color="green" className="button" onClick={this.onIncrease}>
            +
          </Button>
        </div>
        <Button color="green" className="button" onClick={this.createMineField}>
          Создать минное поле
        </Button>
        <Field
          sizeField={this.state.sizeField}
          createFieldTouched={this.state.createFieldTouched}
          onClearField={this.onClearField.bind(this)}
        />
      </div>
    );
  }
}

export default App;
