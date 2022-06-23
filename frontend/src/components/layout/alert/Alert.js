import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Alert = ({Alerts}) => {

    const{showAlert,AlertTitle,message,handleConfirm,handleCancel}=Alerts
    
    return (
      <div>
        <Dialog
          open={showAlert}
        //   aria-labelledby="alert-dialog-title"
        //   aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {AlertTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={handleCancel} >Disagree</Button>
            <Button onClick={handleConfirm}  autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  
export default Alert
