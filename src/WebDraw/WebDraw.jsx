import React, {Component} from 'react';
import Node from './Node/Node'

import './WebDraw.css'

export default class WebDraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isMousePressed: false,
    };
  }

  clearBoard() {
    const grid = getInitialGrid(16);
    this.setState({grid});
  }

  componentDidMount() {
    const grid = getInitialGrid(16);
    this.setState({grid});
  }

  handleMouseDown(row, col, colour) {
    const newGrid = newGridWithColour(this.state.grid, row, col, 1);
    this.setState({grid: newGrid, isMousePressed: true})
  }

  handleMouseEnter(row, col, colour) {
    if (this.state.isMousePressed) {
      const newGrid = newGridWithColour(this.state.grid, row, col, 1);
      this.setState({grid: newGrid, isMousePressed: true})
    }
  }

  handleMouseUp() {
    this.setState({isMousePressed: false})
  }

  render() {
    const {grid, isMousePressed} = this.state;
    console.log(grid);

    return (
      <>
      <button onClick={() => this.clearBoard()}>
        Clear
      </button>
      <div className="grid">
        {grid.map((row, rowId) => {
          return (
            <div key={rowId}>
              {row.map((node, nodeId) => {
                const {row, col, colour} = node;
                return (
                  <Node
                    key={nodeId}
                    row={row}
                    col={col}
                    colour={colour}
                    isMousePressed={isMousePressed}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col, colour)}
                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col, colour)}
                    onMouseUp={() => this.handleMouseUp()}
                  ></Node>);
              })}
            </div>
          );
        })}
      </div>
      </>
    );
  }
}

const createNode = (row, col, colour) => {
  return {row, col, colour}
}

const getInitialGrid = (size) => {
  const grid = [];
  for (let row = 0; row < size; row++) {
    const currRow = [];
    for (let col = 0; col < size; col++) {
      currRow.push(createNode(row, col, 0));
    }
    grid.push(currRow);
  }

  return grid;
};

const newGridWithColour = (grid, row, col, colour) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    colour: colour
  };
  newGrid[row][col] = newNode;

  return newGrid;
}
