import React, { Component } from "react";

import State from "../stateController";
import Page from "../components/Page";

export default class Find extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	render() {
		return (
			<div className="find">
				<Page title="Find Players" />
			</div>
		);
	}
}
