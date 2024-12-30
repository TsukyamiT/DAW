import React, { Component } from "react";

import State from "../stateController";
import Page from "../components/Page";

export default class About extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	render() {
		return (
			<div className="stats">
				<Page title="Stats" />
			</div>
		);
	}
}
