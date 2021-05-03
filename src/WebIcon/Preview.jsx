import React, {Component} from 'react'
import PNGIMage from 'pnglib-es6'

export default class Preview extends Component {
  render() {
    const {
      grid,
      size} = this.props;

    const img = new PNGIMage(size, size, 3);
    for (let i = 0; i < grid.length; i++) {
      const row = grid[i].row;
      const col = grid[i].col;
      const colour = grid[i].colour;
      // col and row are swapped because setPixel(x, y, c) calculates
      // the single id as (y*size + x)
      img.setPixel(col, row, img.createColor(colour));
    }

    const url = img.getDataURL();

    return (
      <img
        id='previewImg'
        alt='previewImg'
        className={`preview`}
        src={url}>
      </img>
    );
  }
}
