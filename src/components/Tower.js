import React, { Component} from "react";
import "../App.css";

class Tower extends Component {
  
  constructor(){
    super();
    this.state = { 
    };
  }

  render (){
    let { list , clickFn } = this.props;
    let towerList = list.map((item,index) => {
      if(item.selected){
        return <li className = "selected" style={{marginBottom: 120,paddingTop: 5, width : item.num  * 50  + 'px' , backgroundColor : item.color}}><font color="white">{item.num}</font></li>;
      }
      else{
        return <li  style={{marginTop: 2,paddingTop: 5, width : item.num  * 50  + 'px' , backgroundColor : item.color}}><font color="white">{item.num}</font></li>;
      }
    });
    return (
      <ul onClick={clickFn} className='tower'>
        {towerList}
      </ul>
    );
  } 
}

export default  Tower;