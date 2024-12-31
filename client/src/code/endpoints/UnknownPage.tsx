import React, { Component } from "react";

import State from "../stateController";
import Page from "../components/Page";
import Typography from "@mui/material/Typography";
import LightUnknownPage from "../components/LightUnknownPage";

export default class UnknownPage extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	render() {
		return (
			<LightUnknownPage />
		);
	}
}
