import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import State from "../stateController";

const Confirmation = () => (
	<div>
		<Dialog
			open={ State.isShowingConfirmation() }
			transitionDuration={ 0 }>
			<DialogTitle style={{ textAlign:"center" }}>{ State.confirmationContents() }</DialogTitle>
			<div className="confirmationButtons">
				<Button
					variant="text"
					onClick={() => {
						State.stopShowingConfirmation();
						State.confirmationCallback()(false);
					}}>
					cancel	
				</Button>
				<Button
					variant="text"
					onClick={() => {
						State.stopShowingConfirmation();
						State.confirmationCallback()(true);
					}}>
					ok	
				</Button>
			</div>
		</Dialog>
	</div>
);

export default Confirmation;
