import React, { Component } from "react";

import ItemName from "./itemName";
import ItemDurationDragControl from "./itemDurationDragControl";

export default class Item extends Component {
  componentWillMount() {
    this.setState({
      item: this.props.item,
      editing: false
    });
  }

  getColor() {
    return COLORS[this.item().id % (COLORS.length - 1)];
  }

  startColumn() {
    return this.props.dateToColumn(this.item().start);
  }

  durationEndColumn() {
    return this.props.dateToColumn(this.item().end) + 1;
  }

  dateControlMoved(whichDate, mouseX) {
    this.setState({
      item: {
        ...this.state.item,
        [whichDate]: this.props.xPositionToDate(mouseX)
      },
      editing: true
    });
  }

  item() {
    return this.state.editing ? this.state.item : this.props.item;
  }

  dateControlDropped(whichDate) {
    this.setState({ editing: false });

    this.props.updateItem({
      id: this.item().id,
      [whichDate]: this.state.item[whichDate]
    });
  }

  render() {
    const row = this.props.row;
    const startColumn = this.startColumn();
    const durationEndColumn = this.durationEndColumn();

    return (
      <div
        style={{
          gridArea: `${row} / ${startColumn} / ${row} / ${durationEndColumn}`
        }}
        className="timeline-item"
      >
        <div
          className="item-duration"
          style={{ backgroundColor: this.getColor() }}
        >
          <ItemDurationDragControl
            onDrag={mouseX => this.dateControlMoved("start", mouseX)}
            onDrop={() => this.dateControlDropped("start")}
            mouse={this.props.mouse}
          />

          <ItemDurationDragControl
            onDrag={mouseX => this.dateControlMoved("end", mouseX)}
            onDrop={() => this.dateControlDropped("end")}
            mouse={this.props.mouse}
          />
        </div>

        <ItemName
          id={this.item().id}
          name={this.item().name}
          updateItem={this.props.updateItem}
        />
      </div>
    );
  }
}

const COLORS = [
  "cyan",
  "lightgreen",
  "lightpink",
  "lightseagreen",
  "mediumaquamarine",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred"
];
