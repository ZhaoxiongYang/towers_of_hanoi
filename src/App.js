import React, { Component } from "react";
import './App.css';
import "./index.css";
import Disks from "./components/Disks";
import TopBar from "./components/TopBar";
import Home from "./components/Home"

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
        <div >
          <TopBar  />
        </div>
          <div>
          <Home />
          </div>
      </div>
    );
  } 
}

