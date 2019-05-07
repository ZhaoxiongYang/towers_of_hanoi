import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {reset} from './Disks'

class AlertDialog extends React.Component {
  
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?  "}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your progress will be Lost!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleCancel} color="primary">
              CANCEL
            </Button>
            <Button onClick={this.props.handleClose} color="primary" autoFocus>
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;