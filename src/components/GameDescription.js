import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit* 2,
    paddingBottom: theme.spacing.unit* 2,
  },
});

class GameDescription extends React.Component {
  
  render(){
    const {classes} = this.props;
    return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Let's Play Tower of Hanoi!
        </Typography>
        <Typography component="p">
          Choose Your Difficulty!.
        </Typography>
      </Paper>
    </div>
  );
  }
  
}

export default withStyles(styles)(GameDescription);