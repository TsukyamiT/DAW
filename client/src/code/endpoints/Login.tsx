import React, { Component } from "react";

import State from "../stateController";
import Page from "../components/Page";

class Leaderboard extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	render() {
		return (
			<div className="login">
				<Page title="Login" />
			</div>
		);
	}
}

export default Leaderboard;
