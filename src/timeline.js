import React, { Component } from "react";
import moment from "moment";

import Item from "./item";
import DateAxis from "./dateAxis";
import RENDER_SIZES from "./renderSizes";
import MouseMonitor from "./mouseMonitor";
import "./timeline.css";

export default class Timeline extends Component {
  componentWillMount() {
    this.setState({ items: parseDates(this.props.items) });
  }

  itemsWithRow() {
    let _rows = [];

    return this.state.items
      .concat()
      .sort((item1, item2) => item1.start - item2.start)
      .map(item => {
        let row = Array.from(_rows.keys()).find(
          i => this.itemEndColumn(_rows[i]) < this.dateToColumn(item.start)
        );

        if (row === undefined) {
          row = _rows.length;
        }

        item.row = row;
        _rows[row] = item;

        return item;
      });
  }

  start() {
    return this.earliestItem().start;
  }

  end() {
    return this.latestItem().end;
  }

  earliestItem() {
    return this.state.items.reduce((earliest, item) =>
      earliest.start < item.start ? earliest : item
    );
  }

  latestItem() {
    return this.state.items.reduce((latest, item) =>
      latest.end > item.end ? latest : item
    );
  }

  xPositionToDate(xPosition) {
    return moment(this.start() + RENDER_SIZES.xPositionToDate(xPosition));
  }

  dateToColumn(date) {
    return date.diff(this.start(), "days") + 1;
  }

  itemEndColumn(item) {
    const textWidth =
      item.start.diff(this.start(), "days") +
      Math.floor(RENDER_SIZES.nameLengthToItemWidth(item.name.length));

    return Math.max(textWidth, this.dateToColumn(item.end));
  }

  columnCount() {
    return this.itemEndColumn(this.latestItem());
  }

  recordMouseState(mouse) {
    this.setState({ mouse });
  }

  updateItem(itemUpdate) {
    this.setState({
      items: this.state.items.map(item => {
        if (item.id !== itemUpdate.id) {
          return item;
        }

        return { ...item, ...itemUpdate };
      })
    });
  }

  render() {
    if (this.state.items.length === 0) {
      return "Please pass in some timeline entries to display";
    }

    const headerRowOffset = 2;

    return (
      <MouseMonitor onMouseChange={this.recordMouseState.bind(this)}>
        <div
          className="timeline-grid"
          style={{ gridTemplateColumns: `repeat(${this.columnCount()}, 30px)` }}
        >
          <DateAxis
            items={this.state.items}
            dateToColumn={this.dateToColumn.bind(this)}
          />

          {this.itemsWithRow().map(item => (
            <Item
              key={item.id}
              item={item}
              row={item.row + headerRowOffset}
              updateItem={this.updateItem.bind(this)}
              mouse={this.state.mouse}
              dateToColumn={this.dateToColumn.bind(this)}
              xPositionToDate={this.xPositionToDate.bind(this)}
            />
          ))}
        </div>
      </MouseMonitor>
    );
  }
}

function parseDates(items) {
  return items.map(item => {
    return { ...item, start: moment(item.start), end: moment(item.end) };
  });
}
