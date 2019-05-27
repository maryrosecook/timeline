import React, { Component } from "react";

export default class ItemDurationDragControl extends Component {
  state = { dragging: false };

  componentWillReceiveProps(newProps) {
    this.handleDrag(newProps);
  }

  handleDrag(newProps) {
    if (!this.draggingAndMouseChanged(newProps)) {
      return;
    }

    if (newProps.mouse.isDown) {
      this.props.onDrag(newProps.mouse.x);
    } else {
      this.setState({ dragging: false });
      this.props.onDrop();
    }
  }

  draggingAndMouseChanged(newProps) {
    return (
      this.state.dragging &&
      (this.props.mouse.isDown !== newProps.mouse.isDown ||
        this.props.mouse.x !== newProps.mouse.x)
    );
  }

  startDrag(control, event) {
    this.setState({ dragging: true });
  }

  render() {
    return (
      <div className="drag-control" onMouseDown={this.startDrag.bind(this)} />
    );
  }
}
