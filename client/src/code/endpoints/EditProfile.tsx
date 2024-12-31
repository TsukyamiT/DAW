import React, { ChangeEvent, Component } from "react";

import State from "../stateController";
import Page from "../components/Page";
import Typography from "@mui/material/Typography";
import LightTextInput from "../components/LightTextInput";
import Button from "@mui/material/Button";
import Authenticator, { AuthSuccess, LoginData } from "../auth";
import Profiles, { IProfile, ProfileUpdateRequest } from "../profiles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LightMultilineTextInput from "../components/LightMultilineTextInput";

const ProfilePicture = () => {
	if (State.editImage === undefined) {
		return (
			<img src={State.getDefaultProfilePicture()} alt="profilePicture" className="profile-picture-input-image" />
		);
	}
	return (
		<img src={State.editImage} alt="profilePicture" className="profile-picture" />
	);
}


export default class EditProfile extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	async componentDidMount() {
		if (!State.isLoggedIn())
			return;
		const profile = await Profiles.getProfile(State.getUsername());
		State.setViewProfile(profile);
	}

	async sendEditData(response: boolean) {
		if (!response)
			return;

		if (!Authenticator.validate(State.editUsername, State.editPassword)) {
			return;
		}

		const newProfile: ProfileUpdateRequest = {
			login: {
				username: State.getUsername(),
				password: State.getPassword(),
			},
			newUsername: State.editUsername,
			newPassword: State.editPassword,
			newPicture: await Profiles.encodeFile(State.editImageFile),
			newDescription: State.editDescription,
		}

		const success: AuthSuccess = await Profiles.update(newProfile);

		if (success.success) {
			// State.logout();
			State.login(State.editUsername, State.editPassword, State.editImageFile);
			State.showInfo("Profile Update", "SUCCESS!");
			State.navigate("/leaderboard");
		} else {
			if (!success.validData) {
				State.showInfo("Profile Update", "ERROR: invalid data!");
			}
			else if (success.usernameExists) {
				State.showInfo("Profile Update", "ERROR: username already exists!");
			}
			else {
				State.showInfo("Profile Update", "ERROR: could not update profile!");
			}
		}
	}

	render() {
		if (!State.isLoggedIn() || State.getViewProfile() === undefined || State.getViewProfile === null)
		{
			return (
			<div className="edit-profile">
				<Page title="Edit Profile" />
				<div style={{ marginBottom: '50' }} />
				<Typography variant="h4" style={{ color: "#6b6b6b", textAlign: "center" }}>
					Log in to see this content!
				</Typography>
			</div>
			)
		}

		const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
			if (!event.target.files) {
				return;
			}
			const file = event.target.files[0];

			State.editImageFile = file;
			State.editImage = URL.createObjectURL(file);
			// const encodedFile = await Profiles.encodeFile(file);
			// const decodedFile = Profiles.decodeFile(encodedFile);
			// State.editImage = URL.createObjectURL(decodedFile);
			State.update();
		}

		return (
			<div className="edit-profile">
				<Page title="Edit Profile" />
				<div style={{ marginBottom: '50' }} />

				<div className="edit-input">
					<LightTextInput
						id="username-input" 
						label="USERNAME"
						defaultValue={State.editUsername}
						onChange={(e) => {
							State.editUsername = e.target.value;
						}}
					/>

					<div style={{ marginBottom: '30px' }} />

					<LightMultilineTextInput
						id="password-input"
						label="PASSWORD"
						type="password"
						defaultValue={State.editPassword}
						onChange={(e) => {
							State.editPassword = e.target.value;
						}}
					/>

					<div style={{ marginBottom: '30px' }} />

					<LightTextInput
						id="desc-input"
						label="DESCRIPTION"
						defaultValue={State.editDescription}
						onChange={(e) => {
							State.editDescription = e.target.value;
						}}
					/>

					<div style={{ marginBottom: '30px' }} />
				</div>

				<div className="pfp-input-exterior">
					<div className="pfp-input">
						<ProfilePicture />
						<Button component="label" variant="outlined" startIcon={<UploadFileIcon />}>
							Upload
							<input type="file" accept=".png" hidden onChange={handleFileUpload} />
						</Button>

						<div style={{ marginBottom: '100px' }} />
					</div>
				</div>

				<Button variant="contained" size="large" onClick={() => {
					State.showConfirmation("Are you sure you want to update your profile?", this.sendEditData)
				}}>
					Save
				</Button>
			</div>
		);
	}
}
