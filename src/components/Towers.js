import React, {Component}from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const disksNum = 3;

function initGame(tower) {
    tower.html("");
    for (let i = 1; i <= disksNum; i++) {
      tower.prepend(
        ('<li class="disk disk-' + i + '" data-value="' + i + '"></li>')
      );
    }
  }

class Towers extends React.Component{
  constructor(props) {
    super(props)
  }

  getClass(size) {
    return "disk disk-" + size + " data-value=" + size;
  }

  renderDisk(size) {
    return (
      <li className={this.getClass(size)}></li>
    );
  }

  render() {
    const  elements = [];

    for (let i = disksNum; i >= 1 ; i--) {
      elements.push(i);
      };
    
    return (
    	<div id="canvas">
  	      <ul className="tower" id="tower-1">
            {elements.map((value) => {
              return this.renderDisk(value)
            })}
          </ul>
          <ul className="tower" id="tower-2"></ul>
          <ul className="tower" id="tower-3"></ul>
  		</div>
    );
  }


}

export default Towers;