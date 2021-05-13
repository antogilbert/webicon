import React, {Component} from 'react'

import './Button.css'

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
    }
  }

  handleClick = () => {
    const {onClick} = this.props;
    this.setState({}, onClick());
  }

  render() {
    return (
        <button
          className="button"
          onClick = {this.handleClick}>
            {this.state.title} 
        </button>
    );
  }
}

