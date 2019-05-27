import React, { Component } from "react";

import RENDER_SIZES from "./renderSizes";

export default class ItemName extends Component {
  updateName(event) {
    const id = this.props.id;
    const name = event.target.value;

    this.props.updateItem({ id, name });
  }

  render() {
    const name = this.props.name;

    return (
      <input
        type="text"
        name="name"
        value={name}
        onChange={this.updateName.bind(this)}
        size={RENDER_SIZES.contentLengthToInputFieldSize(name.length)}
      />
    );
  }
}
