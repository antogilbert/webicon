import React, {Component} from 'react';
import Node from './Node/Node'

import './WebIcon.css'

export default class WebIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isMousePressed: false,
      size: 16,
      colour: '#0000ff',
    };
  }


  clearBoard() {
    const grid = getInitialGrid(this.state.size);
    this.setState({grid});
  }

  saveImage() {
  //  const img = new Image(this.state.size, this.state.size);
  }

  componentDidMount() {
    const grid = getInitialGrid(this.state.size);
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = newGridWithColour(this.state.grid, row, col, this.state.colour);
    this.setState({grid: newGrid, isMousePressed: true})
  }

  handleMouseEnter(row, col) {
    if (this.state.isMousePressed) {
      const newGrid = newGridWithColour(this.state.grid, row, col, this.state.colour);
      this.setState({grid: newGrid, isMousePressed: true})
    }
  }

  handleMouseUp() {
    this.setState({isMousePressed: false})
  }

  render() {
    const {grid, isMousePressed, size} = this.state;
    console.log(grid);
    document.documentElement.style.setProperty("--iconSize", size)
    document.documentElement.style.setProperty("--previewSize", `${size}px`)

    return (
      <>
      <button onClick={() => this.clearBoard()}>
        Clear
      </button>
      <button onClick={() => this.saveImage()}>
        Save
      </button>
      <div
        className="grid"
        onMouseLeave={() => this.handleMouseUp()}>
        {grid.map((node, nodeId) => {
          const {row, col, colour} = node;
          return (
            <Node
              key={nodeId}
              row={row}
              col={col}
              colour={colour}
              isMousePressed={isMousePressed}
              onMouseDown={(row, col) => this.handleMouseDown(row, col)}
              onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
              onMouseUp={() => this.handleMouseUp()}
            ></Node>);
          })}
      </div>
      <div className='preview'>
        <style>
          width: `${size}px`
          height: `${size}px`
        </style>
      </div>
      </>
    );
  }
}

const createNode = (row, col) => {
  return {row, col}
}

const getInitialGrid = (size) => {
  const grid = new Array(size*size);
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const id = row * size + col;
      grid[id] = createNode(row, col);
    }
  }

  return grid;
};

const newGridWithColour = (grid, row, col, colour) => {
  const size = Math.sqrt(grid.length);
  const id = row * size + col
  const newGrid = grid.slice();
  const node = newGrid[id];
  const newNode = {
    ...node,
    colour: colour
  };
  newGrid[id] = newNode;

  return newGrid;
}
