import React, {Component} from "react";
import './Field.css';

class Field extends Component {
    constructor(props) {
        super(props);
        let tempField = [];
        for (let i = 0; i < props.sizeField; i++) {
            tempField[i] = [];
            for (let j = 0; j < props.sizeField; j++) {
                tempField[i][j] = (j + i) % 2 === 1;
            }
        }
        this.state = {
            sizeField: props.sizeField,
            field: tempField,
            nowTime: 0,
            createFieldTouched: false,
        };
        this.iteration = this.iteration.bind(this);
        this.setNewField = this.setNewField.bind(this);
        this.handleClick = this.handleClick.bind(this);
        setInterval(this.iteration, 1000);
    }

    static getDerivedStateFromProps(props) {
        console.log(props.createFieldTouched)
        return {
            createFieldTouched: props.createFieldTouched,
        }
    }

    setNewField(sizeNewField) {
        console.log('Create new field');
        let tempField = [];
        for (let i = 0; i < sizeNewField; i++) {
            tempField[i] = [];
            for (let j = 0; j < sizeNewField; j++) {
                tempField[i][j] = (j + i) % 2 === 1;
            }
        }
        this.setState({sizeField: sizeNewField, field: tempField, nowTime: 0, createFieldTouched: false });
    }

    iteration() {
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
        this.setState({sizeField: this.state.sizeField, field: newField, nowTime: this.state.nowTime + 1});
        this.updateCanvas();
    }

    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        if(this.state.createFieldTouched) {
            this.setNewField(this.props.sizenpField);
            this.props.onClearField();
        }

        const ctx = this.refs.canvas.getContext("2d");
        let cellLength = Math.floor(512 / this.state.sizeField);
        for (let i = 0; i < this.state.sizeField; i++) {
            for (let j = 0; j < this.state.sizeField; j++) {
                ctx.fillStyle = this.state.field[i][j] ? "green" : "black";
                ctx.fillRect(
                    cellLength * i,
                    cellLength * j,
                    cellLength ,
                    cellLength
                );

            }
        }
    }

    handleClick() {
        console.log("click");
    }

    render() {
        return (<div>
                <h1>Прошло {this.state.nowTime} секунд с начала</h1>
                <canvas
                    ref="canvas"
                    width={512}
                    height={512}
                    onClick={this.handleClick}
                />
            </div>
        );
    }
}

export default Field;
