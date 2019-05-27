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

  start() {
    return this.state.items.reduce((earliest, item) =>
      earliest.start < item.start ? earliest : item
    ).start;
  }

  end() {
    return this.state.items.reduce((latest, item) =>
      latest.end > item.end ? latest : item
    ).end;
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

  endColumn() {
    const latest = this.state.items.reduce((latest, item) =>
      latest.end > item.end ? latest : item
    );

    return this.itemEndColumn(latest);
  }

  columnCount() {
    return this.endColumn();
  }

  itemRow(itemToGetRowFor) {
    let itemToGetRowForRow;
    let self = this;

    function addItem(rows, item) {
      let row = getFirstRowWithSpace(rows, item);

      if (row === undefined) {
        row = [];
        row.index = rows.length;
        rows.push(row);
      }

      row.push(item);

      if (item === itemToGetRowFor) {
        itemToGetRowForRow = row.index;
      }

      return rows;
    }

    function getFirstRowWithSpace(rows, item) {
      return rows.find(row => {
        if (row.length === 0) {
          return true;
        }

        return (
          self.itemEndColumn(row[row.length - 1]) <
          self.dateToColumn(item.start)
        );
      });
    }

    this.state.items
      .sort((item1, item2) => item1.start - item2.start)
      .reduce(addItem, []);

    return itemToGetRowForRow + 2;
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
    const items = this.state.items;

    return (
      <MouseMonitor onMouseChange={this.recordMouseState.bind(this)}>
        <div
          className="timeline-grid"
          style={{ gridTemplateColumns: `repeat(${this.columnCount()}, 30px)` }}
        >
          <DateAxis items={items} dateToColumn={this.dateToColumn.bind(this)} />

          {items.map(item => (
            <Item
              key={item.id}
              item={item}
              row={this.itemRow(item)}
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
