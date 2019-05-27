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

    if (newProps.isMouseDown) {
      this.props.onDrag(newProps.mouseX);
    } else {
      this.setState({ dragging: false });
      this.props.onDrop();
    }
  }

  draggingAndMouseChanged(newProps) {
    return (
      this.state.dragging &&
      (this.props.isMouseDown !== newProps.isMouseDown ||
        this.props.mouseX !== newProps.mouseX)
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
