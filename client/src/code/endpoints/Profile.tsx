import React, { Component, useEffect } from "react";

import State from "../stateController";
import Profiles, { IProfile } from "../profiles";

import Page from "../components/Page";
import Typography from "@mui/material/Typography";
import Topbar from "../components/Topbar";
import { useParams, Params } from "react-router-dom";
import Button from "@mui/material/Button";
import BaseLayout from "../components/BaseLayout";
import UnknownPage from "./UnknownPage";
import LightUnknownPage from "../components/LightUnknownPage";

const routerParam = () => {
	const { username } = useParams();

	useEffect(() => {
		let profile: IProfile;
		const fetchData = async () => {
			State.setLoading(true);
			try {
				profile = await Profiles.getProfile(username);
				console.log("got profile");
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
		<Typography variant="h5" className="about-text" align="left" padding="0px">
			{State.getViewProfile().description}
		</Typography>
	);
}

function isMyProfile(): boolean {
	return State.isLoggedIn() && State.getViewProfile().username === State.getUsername();
}

async function onRemove(choice: boolean) {
	if (choice) {
		if (await Profiles.delete(State.getUsername(), State.getPassword())) {
			State.showInfo("Profile Deletion", "SUCCESS!");
			State.logout();
			State.navigate("/leaderboard");
		} else {
			State.showInfo("Profile Deletion", "ERROR REMOVING");
		}
	}
}

const RemoveButton = () => {
	if (isMyProfile()) {
		return (
			<Button variant="contained" color="error" onClick={() => {
				State.showConfirmation("Are you sure you want to delete your account?", onRemove);
			}}>
				DELETE ACCOUNT
			</Button>
		);
	}
	return (null);
}

const EditButton = () => {
	if (isMyProfile()) {
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
	if (State.getViewProfile().encodedPicture === undefined ||
		State.getViewProfile().encodedPicture === null) {
		return (
			<img src={State.getDefaultProfilePicture()} alt="profilePicture" className="profile-picture" />
		);
	}
	return (
		<img src={
			URL.createObjectURL(
			Profiles.decodeFile(
			State.getViewProfile().encodedPicture))
		} alt="profilePicture" className="profile-picture" />
	);
}

class Profile extends Component<ProfileProps> {
	constructor(props: ProfileProps) {
		super(props);
		State.setBaseComponent(this)
	}

	render() {
		const { username } = this.props;
		if (State.getViewProfile() === undefined || State.getViewProfile() === null) {
			return(<LightUnknownPage />);
		}

		return (
			<div className="profile">
				<BaseLayout />
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
					<RemoveButton />
				</div>
			</div>
		);
	}
}

export default routerParam;
