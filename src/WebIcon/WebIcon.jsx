import React, {Component} from 'react';
import Node from './Node/Node'
import Size from './Size/Size'
import Preview from './Preview'
import FileSaver from 'file-saver';

import './WebIcon.css'

export default class WebIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isMousePressed: false,
      colour: '#0000ff',
      size: [
        {
          id: 0,
          title: '16 x 16',
          selected: true,
          value: 16,
        },
        {
          id: 1,
          title: '24 x 24',
          selected: false,
          value: 24,
        },
        {
          id: 2,
          title: '32 x 32',
          selected: false,
          value: 32,
        },
      ]
    };
  }


  clearBoard() {
    const gsize = this.state.size.filter(item => item.selected).map(obj => obj.value)[0];
    const grid = getInitialGrid(gsize);
    this.setState({grid});
  }

  saveImage() {
    const preview = document.getElementById('previewImg');
    FileSaver.saveAs(preview.src, 'icon.png');
  }

  componentDidMount() {
    const gsize = this.state.size.filter(item => item.selected).map(obj => obj.value)[0];
    const grid = getInitialGrid(gsize);
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

  setSize = (id) => {
    this.state.size.forEach((item) => item.selected = false);
    this.state.size[id].selected = true;
    this.clearBoard();
  }

  render() {
    const selectedItem = this.state.size
                             .filter(item => item.selected);

    const gsize = selectedItem.map(item => item.value)[0];
    const gtitle= selectedItem.map(item => item.title)[0];

    const {grid, isMousePressed} = this.state;

    document.documentElement.style.setProperty("--iconSize", gsize)
    document.documentElement.style.setProperty("--previewSize", `${gsize}px`)

    return (
      <>
      <button onClick={() => this.clearBoard()}>
        Clear
      </button>
      <button onClick={() => this.saveImage()}>
        Save
      </button>
      <Size 
        title = {gtitle}
        sizes = {this.state.size}
        setSize = {this.setSize}/>
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
      <Preview
        grid={grid}
        gsize={gsize}
      />
      </>
    );
  }
}

const createNode = (row, col) => {
  return {row, col, colour: '#ffffff'}
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
