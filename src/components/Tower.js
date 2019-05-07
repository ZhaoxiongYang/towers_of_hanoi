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
    let lis = list.map((item,index) => {
      return <li key={index} style={{ width : item.num  * 25 + 15 + 'px' , backgroundColor : item.color }}>''</li>;
    });
    return (
      <ul onClick={clickFn} className='tower'>
        {lis}
      </ul>
    );
  } 
}

export default  Tower;