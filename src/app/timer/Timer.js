import React, { Component } from "react";

class Timer extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
