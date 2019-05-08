import React, { Component} from "react";
import "../App.css";

class Tower extends Component {
  
  constructor(){
    super();
  }

  render (){
    let { list , clickFn } = this.props;
    let towerList = list.map((item,index) => {
      return <li key={index} style={{ width : item.num  * 40 + 15 + 'px' , backgroundColor : item.color }}>''</li>;
    });
    return (
      <ul onClick={clickFn} className='tower'>
        {towerList}
      </ul>
    );
  } 
}

export default  Tower;