import React, { Component } from "react";

import State from "../stateController";
import Page from "../components/Page";
import Typography from "@mui/material/Typography";

export default class About extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	render() {
		return (
			<div className="about">
				<Page title="About" />
				<Typography variant="h5" className="about-text">
					This is a website where you can see the rankings of other players and check the leaderboard :)
				</Typography>
			</div>
		);
	}
}
