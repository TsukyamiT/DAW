import React, { Component } from "react";

import State, { Game } from "../stateController";
import Profiles, { IProfile } from "../profiles";
import PlayerRatings, { IPlayerRating } from "../ratings";
import Page from "../components/Page";
import LeaderboardTable from "../components/LeaderboardTable";

class Leaderboard extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	profiles: IPlayerRating[] = [];

	async componentDidMount() {
		try {
			State.setLoading(true);
			this.profiles = await PlayerRatings.getGameRatings(State.currentGame());
			State.setLoading(false);
		} catch (error) {
			console.error("could not get profiles.");
			this.profiles = [];
			State.setLoading(false);
		}
	}

	render() {
		return (
			<div className="leaderboard">
				<Page title="Leaderboard" />
				<div className="leaderboard-area">
					<div className="leaderboard-table">
						<LeaderboardTable ratings={this.profiles} />
					</div>
				</div>
			</div>
		);
	}
}

export default Leaderboard;
