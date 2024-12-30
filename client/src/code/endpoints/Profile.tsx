import React, { Component } from "react";

import State from "../stateController";
import Page from "../components/Page";
import Typography from "@mui/material/Typography";
import Topbar from "../components/Topbar";
import { useParams, Params } from "react-router-dom";

const routerParam = () => {
	const { username } = useParams();
	console.log(username);
	return (<div> <Profile username={username} /> </div>);
}

interface ProfileProps {
	username: string
}

class Profile extends Component<ProfileProps> {
	constructor(props: ProfileProps) {
		super(props);
		State.setBaseComponent(this)
	}

	render() {
		const { username } = this.props;
		return (
			<div className="profile">
				<Topbar />
				<h1> {username} </h1>
			</div>
		);
	}
}

export default routerParam;
