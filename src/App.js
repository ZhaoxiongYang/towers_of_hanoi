import React, { Component } from "react";
import './App.css';
import "./index.css";
import TopBar from "./components/TopBar";
import Home from "./components/Home";

class App extends Component {
  
  constructor(){
    super();
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

export default App;


