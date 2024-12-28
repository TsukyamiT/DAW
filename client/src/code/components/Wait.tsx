import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import State from "../stateController";

const Wait = () => (
	<Dialog
		open={ State.isLoading() }
		disableEscapeKeyDown={ true }
		transitionDuration={ 0 }>
		<DialogTitle style={{ textAlign:"center" }}>Please Wait</DialogTitle>
		<DialogContent><DialogContentText>Contacting server...</DialogContentText></DialogContent>
	</Dialog>
);

export default Wait;
