import React, { useEffect, useRef } from "react";

import State from "../stateController";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const textColor = '#131314';

const theme = createTheme({
	palette: {
		primary: {
			main: textColor,
			light: textColor,
			dark: textColor,
			contrastText: textColor,
		},
	},
});

function ProfileWidget(props: any) {
	const open = props.open;
	if (open)
		return <ProfileButtonWidget />
	else
		return null;
}

const ProfileButtonWidget = () => (
	<div className="profileButton-widget" id="profileButtonWidget">
		<ThemeProvider theme={theme}>
			<Button 
				className="profileButton-widget-button"
				variant="text"
				color="primary"
				size="large"
				onClick={() => {
					State.navigate("/profile/" + State.getUsername());
				}}>
				<Typography variant="h6">
					PROFILE
				</Typography>
			</Button>
			<Button 
				className="profileButton-widget-button"
				variant="text"
				color="primary"
				size="large"
				onClick={() => {
					State.logout();
				}}>
				<Typography variant="h6">
					LOG OUT
				</Typography>
			</Button>
		</ThemeProvider>
	</div>
);

const ProfileButton = () => {

	const ref = useRef(null);

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			State.turnOffButtonWidget();
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	});

	return (
		<div ref={ref} className="profileButton" id="profileButton">
			<ProfileWidget open={State.isShowingProfileButtonWidget()} />
			<button className="profileButton-button" onClick={() => {
				if (State.isSignedIn())
					State.toggleProfileButtonWidget();
				else
					State.navigate("/login");
			}}>
				<img src={State.getProfilePicture()} alt="profilePicture" className="profileButton-img" />
				<Typography variant="h6">
					{State.getUsername()}
				</Typography>
			</button>
		</div>
	);
};

export default ProfileButton;
