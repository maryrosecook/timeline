import React, { Component } from "react";

export default class MouseMonitor extends Component {
  state = { x: 0, isDown: false };

  recordMouseX({ pageX }) {
    this.setState({ ...this.state, x: pageX }, () =>
      this.props.onMouseChange(this.state)
    );
  }

  recordIsMouseDown(isDown) {
    this.setState({ ...this.state, isDown }, () =>
      this.props.onMouseChange(this.state)
    );
  }

  render() {
    return (
      <div
        className="screen"
        onMouseMove={this.recordMouseX.bind(this)}
        onMouseDown={() => this.recordIsMouseDown(true)}
        onMouseUp={() => this.recordIsMouseDown(false)}
      >
        {this.props.children}
      </div>
    );
  }
}
