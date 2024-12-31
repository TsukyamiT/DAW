import React, { Component } from "react";

import State from "../stateController";
import Page from "../components/Page";
import Matches from "../matches";
import Profiles from "../profiles";
import Typography from "@mui/material/Typography";

export default class About extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	async componentDidMount() {
		const matchesPlayed = (await Matches.getAllMatches()).length;
		const numUsers = (await Profiles.getAllProfiles()).length;
		State.setNumberOfPlayers(matchesPlayed);
		State.setNumberOfMatches(numUsers);
	}

	render() {
		return (
			<div className="about">
				<Page title="Stats" />
				<Typography variant="h5" className="about-text" align="left" padding="0px">
					Total number of players: {State.getNumberOfPlayers()}
				</Typography>
				<Typography variant="h5" className="about-text" align="left" padding="0px">
					Total number of matches: {State.getNumberOfMatches()}
				</Typography>
			</div>
		);
	}
}
