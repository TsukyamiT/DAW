import React, { Component } from "react";

import State from "../stateController";
import Page from "../components/Page";
import Typography from "@mui/material/Typography";

export default class UnknownPage extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	render() {
		return (
			<div className="unknownPage">
				<Page title="Missing Page" />
				<Typography variant="h5" className="about-text">
					The page you are trying to view doesn't exist :(
				</Typography>
			</div>
		);
	}
}
