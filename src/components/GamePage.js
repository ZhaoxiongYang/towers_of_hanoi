import React, { Component} from "react";
import "../App.css";
import Tower from "./Tower";
import AlertDialog from './AlertDialog'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { spacing } from '@material-ui/system';
import { connect } from 'react-redux';
import store from '../store';
import { UPDATE_GAME_STATUS, UPDATE_PRE_STEP_STATUS} from "../ReduxStoreActions";

const mapStateToProps = store => {
  return {
    tower1: store.game.tower1,
    tower2: store.game.tower2,
    tower3: store.game.tower3,
    activeTower: store.game.activeTower,
    gameStatus: store.game.gameStatus,
    needInit : store.game.needInit,
  }
}
const button_style = {
  fontWeight: 'bold',
  padding : 20, 
  backgroundColor :'#bf3f38', 
  color: '#ffffff',
};

class GamePage extends Component {
  
  constructor(props){
    super(props);
    this.state = { 
      openSnakBarOpen : false,
      vertical: 'top',
      horizontal: 'center',
      alertOpen: false,
      winCheckOpen:false,
      needInit: this.props.needInit, 
      Towers:['Tower1','Tower2','Tower3'],
      colors:['#FF6666','#FF3333','#FF0000','#CC0000','#990000','#660000','#330000'],
      step:0,
      Tower1:this.props.tower1,
      Tower2:this.props.tower2,
      Tower3:this.props.tower3,
      activeTower: this.props.activeTower,
      gameStatus:this.props.gameStatus, // static => catch => static
    };
  }

  componentWillMount(){
    if(this.state.needInit)
      {
        this.initData();
      }
  }

  initData(){
    let { level } = this.props;
    if (level > 0) {
      let Tower1 = Array(level).join(',').split(',').map((item,index,array) => {
        return { 
          num : array.length - index,
          color : this.state.colors[array.length - index-1],
          selected: false,
        };
      });
      let Tower2 = [];
      let Tower3 = [];

      this.setState({
        Tower1: Tower1,
        Tower2: Tower2,
        Tower3: Tower3,
        step:0,
        gameStatus:'static', // static => catch => static
        needInit : false,
      });
      this.updatePreStepStatus(Tower1,Tower2,Tower3,"",'static',false)
      this.updateGameStatus(Tower1,Tower2,Tower3,"",'static',false)
    }  
  }

  clickFn = (num) =>{
    let list = [ 
      'Tower1',
      'Tower2',
      'Tower3'
    ]
    return () => {
      const name = list[num];
      this.click(name);
      
    }
  }

  updateGameStatus = (tower1,tower2,tower3,activeTower,gameStatus,needInit) => {
    store.dispatch({
      type:UPDATE_GAME_STATUS,
      tower1: tower1,
      tower2: tower2,
      tower3: tower3,
      activeTower: activeTower,
      gameStatus: gameStatus,
      needInit: needInit,
    })
  }

  click = (name) => {
    if ( this.state.gameStatus === 'static' ) {
      if ( this.state[name].length > 0 ) {
        let tower = this.state[name];
        tower[tower.length - 1].color = '#3f51b5' 
        tower[tower.length - 1].selected = true
        this.setState({
          name: tower,
          gameStatus:'catch',
          activeTower: name,
          needInit : false,
        });
        this.updateGameStatus(this.state.Tower1,this.state.Tower2,this.state.Tower3,this.state.activeTower,this.state.gameStatus,this.state.needInit)
      }
    } else if ( this.state.gameStatus === 'catch' ) {
      let formTowerName = this.state.activeTower;
      let formTower = this.state[formTowerName];
      let toTower = this.state[name];
      if ( toTower.length === 0 || toTower[toTower.length - 1].num >= formTower[formTower.length - 1].num ){
        let moveItem = formTower.pop();
        moveItem.color = this.state.colors[moveItem.num-1];
        moveItem.selected = false;
        toTower.push(moveItem);
        let steps =this.state.step;
        if(formTowerName != name){
          steps = steps +1;
        }
        this.setState({
          name : toTower,
          formTowerName: formTower, 
          activeTower : '',
          gameStatus:'static',
          step: steps,
          needInit : false,
        });
        this.updateGameStatus(this.state.Tower1,this.state.Tower2,this.state.Tower3,this.state.activeTower,this.state.gameStatus,this.state.needInit)
      }
      else{
        this.handleSnakBarOpen()
      }  
    }
    this.winCheck()

  }

  reset = ()=>{
    this.initData();
  }

    timeoutClick(name){
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        this.click(name);
        return resolve();
      },300);
    });
  }

  answerStart=()=>{  
    this.initData();
    setTimeout(()=>{
      this.script();
    },0);
  }

  script = ()=>{
    let { level } = this.props;
    this.moveNtoWhere(level,'Tower3');
  }

  moveNtoWhere = (n,where) => {
    if ( n <= 1 ) return this.move1toWhere(where);
    let origin = this.findNum(n);
    let other = this.findOther(origin,where);
    return this.moveNtoWhere(n-1,other)
               .then(()=>this.timeoutClick(origin))
               .then(()=>this.timeoutClick(where))
               .then(()=>this.moveNtoWhere(n-1,where))
               .catch((err)=>{console.log(err)});
  }

  move1toWhere(where){
    let origin = this.findNum(1);
    return this.timeoutClick(origin).then(()=>this.timeoutClick(where)).catch((err)=>{console.log(err)});
  }

  findOther(origin,where){
    return this.state.Towers.filter(item => item !== origin && item !== where)[0];
  }

  findNum(number){
    const nameList = this.state.Towers;
    let name;
    [ this.state.Tower1 , this.state.Tower2, this.state.Tower3 ].forEach((item,index)=>{
      if ( item.find(el => el.num === number) !== undefined ) name = nameList[index];
    }); 
    return name;
  }

  winCheck(){
    let { level } = this.props;
    if ( this.state.gameStatus === 'catch') {
      if(this.state['Tower3'].length === level && this.state['Tower2'].length === 0 && this.state['Tower1'].length === 0){
        this.handleWinCheckAlertOpen();
      }
    }
  }

  handleWinCheckAlertOpen = () => {
    this.setState({ winCheckOpen: true });
  };

  handleWinCheckClose = (event, closeCallback) => {
    this.setState({ winCheckOpen: false });
    closeCallback()
  };

  handleAlertOpen = () => {
    this.setState({ alertOpen: true });
  };

  handleClose = (event, closeCallback) => {
    this.setState({ alertOpen: false });
    closeCallback()
  };
  handleCancel = (event) => {
    this.setState({ alertOpen: false });
  };

  getCancelAction=()=>{
    return(<Button onClick={this.handleCancel} color="primary">
              CANCEL
            </Button>);
  }

  getConfirmAction=(clickHandler)=>{
    return(<Button onClick={clickHandler} color="primary" autoFocus>
              YES
            </Button>);
  }

  handleSnackBarClose = () => {
    this.setState({ openSnakBarOpen: false });
  };

  handleSnakBarOpen = () => {
    this.setState({ openSnakBarOpen: true});
  };

  getSnackBar = (vertical,horizontal) => {
    return (
      <Snackbar
          anchorOrigin={ {vertical, horizontal}}
          open={this.state.openSnakBarOpen}
          autoHideDuration={1000}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Wrong Move</span>}
        />)
  }

  getNovFooter = (resetDifficulty) => {
    return (
    <div style = {{paddingTop : 100 }} >
    <span style = {{padding : 20}}>
      <Button style = {button_style} variant="contained" color="red" onClick={resetDifficulty}>
        Change difficulty
      </Button>
      </span>
      <span style = {{padding : 20}} >
      
      <Button style = {button_style} variant="contained"  onClick={this.handleAlertOpen}>
          Restart
        </Button>
      </span>

      <span style = {{padding : 20}} >
          <Button style = {button_style} variant="contained" color="primary" onClick={this.answerStart.bind(this)}>
            Solution
          </Button>
      </span>
      </div>

    );
  }

  render (){
    const { vertical, horizontal, open } = this.state;
    return (
      <div className='container'>
        <div className="step">Moves:{this.state.step}</div>
        
        <div className='Disks'>
          <Tower list={this.state.Tower1} clickFn={this.clickFn(0)} />
          <Tower list={this.state.Tower2} clickFn={this.clickFn(1)} />
          <Tower list={this.state.Tower3} clickFn={this.clickFn(2)} />
        </div>
        <b />
        <b />

        {this.getNovFooter(this.props.resetDifficulty)}

        {<AlertDialog 
          open={this.state.alertOpen} 
           handleClose={(e) => this.handleClose(e, this.reset)}
           cancelButton= {this.getCancelAction()}
           confirmButton={this.getConfirmAction((e) => this.handleClose(e, this.reset))} 
           dialogTitle="Are you sure?"
           dialogMessage="You are about to reset your progress..."/>}
        {<AlertDialog 
          open={this.state.winCheckOpen} 
           handleClose={(e) => this.handleClose(e, this.reset)}
           confirmButton={this.getConfirmAction((e) => this.handleWinCheckClose(e, this.reset))} 
           dialogTitle="Congratulations!"
           dialogMessage="You nailed it with! Let's play again!"/>}
        {
          this.getSnackBar(this.state.vertical,this.state.horizontal)
        }
      </div>
    );
  } 
}

export default connect(mapStateToProps)(GamePage);
