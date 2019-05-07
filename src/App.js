import React, { Component } from "react";
import './App.css';
import "./index.css";

import Disks from "./components/Disks";

const level = 3;

export default class App extends Component {
  
  constructor(){
    super();
    this.state = { 
    };
  }

  render (){
    return (
      <Disks level={level} />
    );
  } 
}

