import React, { Component} from "react";
import "../App.css";
import Tower from "./Tower";
import AlertDialog from './AlertDialog'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { spacing } from '@material-ui/system';

class Disks extends Component {
  
  constructor(){
    super();
    this.state = { 
      openSnakBarOpen : false,
      vertical: 'top',
      horizontal: 'center',
      alertOpen: false,
      winCheckOpen:false,
      Towers:['Tower1','Tower2','Tower3'],
      step:0,
      Tower1:[],
      Tower2:[],
      Tower3:[],
      activeTower: '',
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
          color : '#ff9800'
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
      this.click(name);
    }
  }

  click(name){
    if ( this.state.st === 'static' ) {
      if ( this.state[name].length > 0 ) {
        let tower = this.state[name];
        tower[tower.length - 1].color = '#3f51b5' 
        this.setState({
          name: tower,
          st:'catch',
          activeTower: name,
        });
      }
    } else if ( this.state.st === 'catch' ) {
      let formTowerName = this.state.activeTower;
      let formTower = this.state[formTowerName];
      let toTower = this.state[name];
      if ( toTower.length === 0 || toTower[toTower.length - 1].num >= formTower[formTower.length - 1].num ){
        let moveItem = formTower.pop();
        moveItem.color = '#ff9800';
        toTower.push(moveItem);
        this.setState({
          name : toTower,
          formTowerName: formTower, 
          activeTower : '',
          st:'static',
          step:++this.state.step
        });
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

  winCheck(){
    let { level } = this.props;
    if ( this.state.st === 'catch') {
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
    console.log("wrong move")
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
      <Button style = {{padding : 20}} variant="contained" color="primary" onClick={resetDifficulty}>
        Change difficulty
      </Button>
      </span>
      <span style = {{padding : 20}} >
      
      <Button style = {{padding : 20}} variant="contained" color="primary" onClick={this.handleAlertOpen}>
          Restart
        </Button>
      </span>
      </div>

    );
  }

  render (){
    const { vertical, horizontal, open } = this.state;
    return (
      <div className='container'>
        
        
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
           dialogMessage="You nailed it! Let's play again!"/>}
        {
          this.getSnackBar(this.state.vertical,this.state.horizontal)
        }
      </div>
    );
  } 
}


export default Disks;