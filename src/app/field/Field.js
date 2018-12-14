import React, { Component } from "react";

class Field extends Component {
  constructor(props) {
    super(props);
    let tempField = [];
    for (var i = 0; i < props.sizeField; i++) {
      tempField[i] = [];
      for (var j = 0; j < props.sizeField; j++) {
        tempField[i][j] = (j + i) % 2 === 1 ? true : false;
      }
    }
    this.state = { sizeField: props.sizeField, field: tempField };
    this.iteration = this.iteration.bind(this);
    this.setNewField = this.setNewField.bind(this);
  }

  setNewField(sizeNewField) {
    let tempField = [];
    for (var i = 0; i < sizeNewField; i++) {
      tempField[i] = [];
      for (var j = 0; j < sizeNewField; j++) {
        tempField[i][j] = (j + i) % 2 === 1 ? true : false;
      }
    }
    this.setState({ sizeField: sizeNewField, field: tempField });
  }

  iteration = () => {
    let newField = [];
    for (let i = 0; i < this.state.sizeField; i++) {
      newField[i] = [];
      for (let j = 0; j < this.state.sizeField; j++) {
        newField[i][j] = false;
      }
    }
    for (let i = 0; i < this.state.sizeField; i++) {
      for (let j = 0; j < this.state.sizeField; j++) {
        let c = 0;
        if (i - 1 >= 0 && j - 1 >= 0 && this.state.field[i - 1][j - 1] === true)
          c += 1;
        if (j - 1 >= 0 && this.state.field[i][j - 1] === true) c += 1;
        if (
          i + 1 < this.state.sizeField &&
          j - 1 >= 0 &&
          this.state.field[i + 1][j - 1] === true
        )
          c += 1;
        if (i + 1 < this.state.sizeField && this.state.field[i + 1][j] === true)
          c += 1;
        if (i - 1 >= 0 && this.state.field[i - 1][j] === true) c += 1;
        if (
          j + 1 < this.state.sizeField &&
          i - 1 >= 0 &&
          this.state.field[i - 1][j + 1] === true
        )
          c += 1;
        if (j + 1 < this.state.sizeField && this.state.field[i][j + 1] === true)
          c += 1;
        if (
          i + 1 < this.state.sizeField &&
          j + 1 < this.state.sizeField &&
          this.state.field[i + 1][j + 1] === true
        )
          c += 1;

        if (this.state.field[i][j] === false && c === 3) {
          newField[i][j] = true;
        }
        if (this.state.field[i][j] === true && (c === 2 || c === 3)) {
          newField[i][j] = true;
        }
      }
    }
    this.setState({ sizeField: this.state.sizeField, field: newField });
  };

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext("2d");
    for (var i = 0; i < this.state.sizeField; i++) {
      for (var j = 0; j < this.state.sizeField; j++) {
        ctx.fillStyle = this.state.field[i][j] ? "green" : "black";
        ctx.fillRect(i * 10, j * 10, 10, 10);
      }
    }
  }

  render() {
    return <canvas ref="canvas" className="canvas-field" />;
  }
}

export default Field;
