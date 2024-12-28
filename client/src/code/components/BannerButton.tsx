import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import State from "../stateController";

const BannerButton = ({banner, onClick}) => (
	<div className="bannerButton">
		<button className="bannerButton_button">
			<img src={banner} alt="bannerButton" className="bannerButton_banner" onClick={onClick}/>
		</button>
	</div>
);

export default BannerButton;
