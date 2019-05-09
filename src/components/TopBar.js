import React, {Component}from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  root: {
    flexGrow: 1,

  },
};

class TopBar extends Component {
  render() {
    const { classes } = this.props;
    const img = <img style={{ width : 100}}src="https://certik.org/img/certik_256.png"/>;
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ background: '#000000' }} >
          <Toolbar>
              {img}

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(TopBar);