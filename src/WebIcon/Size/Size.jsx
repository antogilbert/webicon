import React, {Component} from 'react';

import Button from '../Button/Button'
import './Size.css'

export default class Size extends Button {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false,
      headerTitle: this.props.title,
    }
  }

  toggleList = () => {
    this.setState((prevState) => ({isListOpen: !prevState.isListOpen}))
  }

  selectItem(item) {
    const {setSize} = this.props;
    const {title, id} = item;

    this.setState({
      headerTitle: title,
      isListOpen: false}, () => setSize(id));
  }

  render() {
    const {isListOpen, headerTitle} = this.state;
    const {sizes} = this.props;

    return (
      <div
        className="icon-size-wrapper">
        <button
          className="button"
          onClick={this.toggleList}>
          <div className="icon-size-header-title"> {headerTitle}
          </div>
          {isListOpen ? "^" : "v"}
        </button>
        {isListOpen && (
          <div role="list" className="icon-size-list">
          {
            sizes.filter(item => !item.selected).map((item) => (
              <button
                className="button option"
                key={item.id}
                onClick={() => this.selectItem(item)}>
              {item.title}
              {' '}
              {item.selected && "#"}
              </button>
            ))
          }
          </div>
        )}
      </div>
    );
  }
}
