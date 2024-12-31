import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import State from "../stateController";

const Info = () => {
	const handleKeyPress = (event: any) => {
		if (event.key === "Enter") {
			State.stopShowingInfo();
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		}
	});

	return (
		<div>
			<Dialog
				open={ State.isShowingInfo() }
				transitionDuration={ 0 }>
				<DialogTitle style={{ textAlign:"center" }}>{ State.infoTitle() }</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{ State.infoContents() }
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
	)
};

export default Info;
