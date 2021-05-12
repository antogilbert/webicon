import React, {Component} from 'react'
import PNGIMage from 'pnglib-es6'

export default class Preview extends Component {
  render() {
    const {
      grid,
      gsize} = this.props;

    const img = new PNGIMage(gsize, gsize, 3);
    for (let i = 0; i < grid.length; i++) {
      const row = grid[i].row;
      const col = grid[i].col;
      const color = grid[i].color;
      // col and row are swapped because setPixel(x, y, c) calculates
      // the single id as (y*size + x)
      img.setPixel(col, row, img.createColor(color));
    }

    const url = img.getDataURL();

    return (
      <div className="preview">
        <div>
          Preview
        </div>
        <div>
        <img
          id='previewImg'
          alt='previewImg'
          className="previewImg"
          src={url}>
        </img>
        </div>
      </div>
    );
  }
}
