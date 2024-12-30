import React, { Component, useEffect } from "react";

import State, { Game } from "../stateController";
import Matches, { Result } from "../matches";
import Page from "../components/Page";
import Button from "@mui/material/Button";
import LightSelectInput from "../components/LightSelectInput";
import LightTextInput from "../components/LightTextInput";
import Typography from "@mui/material/Typography";

class AddMatch extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	private static readonly games = [ // careful with changing order
		"Guilty Gear",
		"League of Legends",
		"Overwatch",
		"Counter Strike 2",
		"Rocket League",
		"Valorant",
	];

	private static readonly results = [ // careful with changing order
		"Win",
		"Loss",
		"Draw",
	];

	currGame = Game.none;
	currResult = Result.none;
	currRating = "";

	render() {
		if (!State.isLoggedIn())
		{
			return (
			<div className="add-match">
				<Page title="Add Match Record" />
				<div style={{ marginBottom: '50' }} />
				<Typography variant="h4" style={{ color: "#6b6b6b", textAlign: "center" }}>
					Log in to see this content!
				</Typography>
			</div>
			)
		}

		return (
			<div className="add-match">
				<Page title="Add Match Record" />
				<div style={{ marginBottom: '50' }} />
				<div className="add-match-inputs">
					<div className="add-match-input">
						<LightSelectInput 
							label="GAME"
							items={AddMatch.games}
							onChange={(e) => {
								const input = AddMatch.games[e.target.value];
								if (input === AddMatch.games[0])
									this.currGame = Game.ggst;
								else if (input === AddMatch.games[1])
									this.currGame = Game.lol;
								else if (input === AddMatch.games[2])
									this.currGame = Game.ow;
								else if (input === AddMatch.games[3])
									this.currGame = Game.cs;
								else if (input === AddMatch.games[4])
									this.currGame = Game.rl;
								else if (input === AddMatch.games[5])
									this.currGame = Game.val;
							}}/>

						<div style={{ marginBottom: '30px' }} />

						<LightSelectInput 
							label="RESULT"
							items={AddMatch.results}
							onChange={(e) => {
								const input = AddMatch.results[e.target.value];
								if (input === AddMatch.results[0])
									this.currResult = Result.win;
								else if (input === AddMatch.results[1])
									this.currResult = Result.loss;
								else if (input === AddMatch.results[2])
									this.currResult = Result.draw;
							}}/>

						<div style={{ marginBottom: '30px' }} />

						<LightTextInput
							id="rating-input" 
							label="NEW RATING"
							onChange={(e) => {
								this.currRating = e.target.value;
							}}
						/>

						<div style={{ marginBottom: '30px' }} />

						<Button variant="contained" onClick={() => {
							Matches.add(this.currGame, this.currResult, this.currRating);
						}}>
							Add
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default AddMatch;
