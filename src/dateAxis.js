import React, { Component } from "react";

export default class DateAxis extends Component {
  dates() {
    return this.props.items
      .reduce((dates, item) => dates.concat(item.start, item.end), [])
      .reduce((dates, date) => {
        dates[this.props.dateToColumn(date) - 1] = date;

        return dates;
      }, [])
      .map(date => (date ? date.format("MMM DD YYYY") : ""));
  }

  render() {
    return this.dates().map((date, i) => {
      return (
        <div
          key={i}
          className="date-mark"
          style={{
            gridColumn: `${i + 1} / span 1`,
            gridRow: 1
          }}
        >
          <div className="date">{date}</div>
        </div>
      );
    });
  }
}
