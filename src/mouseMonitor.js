import React, { Component } from "react";

export default class MouseMonitor extends Component {
  state = { mouse: { x: 0, isDown: false } };

  recordMouseX({ pageX }) {
    this.setState({ mouse: { ...this.state.mouse, x: pageX } }, () =>
      this.props.onMouseChange(this.state.mouse)
    );
  }

  recordIsMouseDown(isDown) {
    this.setState({ mouse: { ...this.state.mouse, isDown } }, () =>
      this.props.onMouseChange(this.state.mouse)
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
