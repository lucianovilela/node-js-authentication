import React from "react";
import { useState, useContext } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Recover from "./components/auth/Recover";
import { InfoProvider } from "./context/InfoContext";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import AuthContext from "./context/InfoContext";

function CustomizedDialogs() {
    const state = useContext(AuthContext);

    const [open, setOpen] = useState(false);

  const handleClose = () => {
    state.action.clearMsg();
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open || state.state.msg }>
        <MuiDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Mensagem
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <Typography gutterBottom>
            {state.state.msg?.msg}
          </Typography>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}
const App = () => {
    return (
    <InfoProvider>
      <CustomizedDialogs/>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/recover" component={Recover} />
          {/* <Route path="*" component={ResolveAuth} /> */}
        </Switch>
      </Router>
    </InfoProvider>
  );
};
export default App;
