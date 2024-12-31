import React, { Component, useEffect } from "react";

import State from "../stateController";
import Profiles, { IProfile } from "../profiles";

import Page from "../components/Page";
import Typography from "@mui/material/Typography";
import Topbar from "../components/Topbar";
import { useParams, Params } from "react-router-dom";
import Button from "@mui/material/Button";

const routerParam = () => {
	const { username } = useParams();

	useEffect(() => {
		let profile: IProfile;
		const fetchData = async () => {
			State.setLoading(true);
			try {
				profile = await Profiles.getProfile(username);
			} catch (error) {
				console.error("could not get profiles.");
				profile = undefined;
			}
			State.setViewProfile(profile);
			State.setLoading(false);
		}

		if (State.getViewProfile() === undefined || State.getViewProfile().username !== username) {
			fetchData();
		}
	})

	return (<div> <Profile username={username} /> </div>);
}

interface ProfileProps {
	username: string
}

const Description = () => {
	if (State.getViewProfile().description === undefined) {
		return (
			<Typography variant="h5" className="about-text" align="left" padding="0px">
				No description.
			</Typography>
		);
	}
	return (
		<Typography variant="h5" className="about-text" align="left">
			{State.getViewProfile().description}
		</Typography>
	);
}

const EditButton = () => {
	if (State.isLoggedIn() && State.getViewProfile().username === State.getUsername()) {
		return (
			<Button variant="contained" onClick={() => {
				State.navigate("/edit");
			}}>
				EDIT
			</Button>
		);
	}
	return (null);
}

const ProfilePicture = () => {
	if (State.getViewProfile().picture === undefined) {
		return (
			<img src={State.getDefaultProfilePicture()} alt="profilePicture" className="profile-picture" />
		);
	}
	return (
		<img src={State.getViewProfile().picture} alt="profilePicture" className="profile-picture" />
	);
}

class Profile extends Component<ProfileProps> {
	constructor(props: ProfileProps) {
		super(props);
		State.setBaseComponent(this)
	}

	render() {
		const { username } = this.props;
		if (State.getViewProfile() === undefined)
			return(null);
		return (
			<div className="profile">
				<Topbar />
				<div className="profile-main">
					<div className="profile-main-logo">
						<ProfilePicture />
						<Typography variant="h4" className="about-text" margin="0px" padding="0px">
							{State.getViewProfile().username}
						</Typography>
					</div>
					<div className="profile-main-desc">
						<Description />
					</div>
				</div>

				<div style={{ marginBottom: '50px' }} />

				<div className="profile-first-line">
					<EditButton />
				</div>
			</div>
		);
	}
}

export default routerParam;
