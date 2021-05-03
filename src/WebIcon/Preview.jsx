import React, {Component} from 'react'
import PNGIMage from 'pnglib-es6'

export default class Preview extends Component {
  render() {
    const {
      grid,
      size} = this.props;

    const img = new PNGIMage(size, size, 2);
    for (let i = 0; i < grid.length; i++) {
      const row = grid[i].row;
      const col = grid[i].col;
      const colour = grid[i].colour;
      img.setPixel(col, row, img.createColor(colour));
      console.log('Row: ' + row + ' - Col: ' + col + ' - Colour: ' + colour)
    }
    const url = img.getDataURL();
    console.log(url);

    return (
      <img
        className={`preview`}
        src={url}>
      </img>
    );
  }
}
