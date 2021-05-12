import React, {Component} from 'react'

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      color,
      onMouseDown,
      onMouseEnter,
      onMouseUp
    } = this.props;

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node`}
        color={color}
        style={{background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}}
        onMouseDown={() => onMouseDown(row, col, color)}
        onMouseEnter={() => onMouseEnter(row, col, color)}
        onMouseUp={() => onMouseUp()}>
      </div>
    );
  }
}
