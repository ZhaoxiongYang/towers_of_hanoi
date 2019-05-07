import React, { Component } from "react";
import './App.css';
import "./index.css";

import Disks from "./components/Disks";
import TopBar from "./components/TopBar";
const level = 3;

export default class App extends Component {
  
  constructor(){
    super();
    this.state = { 
    };
  }

  render (){
    return (
      <div className="App">
        <div className = "App-header">
          <TopBar />
        </div>
        <div className = "display">
          <Disks level={level} />
        </div>
      </div>
    );
  } 
}

