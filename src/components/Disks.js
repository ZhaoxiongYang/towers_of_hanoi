import React, { Component, Children } from "react";
import "../App.css";
import Tower from "./Tower";


export default class Disks extends Component {
  
  constructor(){
    super();
    this.state = { 
      Towers:['Tower1','Tower2','Tower3'],
      lock:false,
      step:0,
      Tower1:[],
      Tower2:[],
      Tower3:[],
      st:'static', // static => catch => static
    };
  }

  componentWillMount(){
    this.initData();
  }

  initData(){
    let { level } = this.props;
    if (level > 0) {
      let Tower1 = Array(level).join(',').split(',').map((item,index,array) => {
        return { 
          num : array.length - index,
          color : 'red'
        };
      });
      let Tower2 = [];
      let Tower3 = [];
      this.setState({
        Tower1,
        Tower2,
        Tower3,
        step:0,
        st:'static', // static => catch => static
      });
    }  
  }

  clickFn(num){
    let list = [ 
      'Tower1',
      'Tower2',
      'Tower3'
    ]
    return () => {
      const name = list[num];
      this.clickHigh(name);
    }
  }

 

  render (){
    return (
      <div className='container'>
        <div className="step">step:{this.state.step}</div>
        <div className="top">
          <div className="name">Tower1</div>
          <div className="name">Tower2</div>
          <div className="name">Tower3</div>
        </div>
        <div className='Disks'>
          <Tower list={this.state.Tower1} clickFn={this.clickFn(0)} />
          <Tower list={this.state.Tower2} clickFn={this.clickFn(1)} />
          <Tower list={this.state.Tower3} clickFn={this.clickFn(2)} />
        </div>

      </div>
    );
  } 
}