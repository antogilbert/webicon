import React, {Component} from 'react'

import './Node.css'

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      colour,
      onMouseDown,
      onMouseEnter,
      onMouseUp
    } = this.props;

    const colourName = (colour === 1) ?  "node-wall" : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${colourName}`}
        colour={colour}
        onMouseDown={() => onMouseDown(row, col, colour)}
        onMouseEnter={() => onMouseEnter(row, col, colour)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}
