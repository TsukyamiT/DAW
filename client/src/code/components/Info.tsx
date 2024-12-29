import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import State from "../stateController";

const Info = () => (
	<div>
		<Dialog
			open={ State.isShowingInfo() }
			transitionDuration={ 0 }>
			<DialogTitle style={{ textAlign:"center" }}>{ State.infoTitle() }</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
						{ State.infoContents() }
					</Typography>
				</DialogContentText>
			</DialogContent>
			<Button
				variant="text"
				onClick={() => {
					State.stopShowingInfo();
				}}>
				ok	
			</Button>
		</Dialog>
	</div>
);

export default Info;
