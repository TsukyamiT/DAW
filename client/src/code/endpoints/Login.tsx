import React, { Component, useEffect } from "react";

import State from "../stateController";
import Authenticator from "../auth";
import Page from "../components/Page";
import LightTextInput from "../components/LightTextInput";
import Button from "@mui/material/Button";

class Login extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	currUsername = "";
	currPassword = "";

	handleKeyPress = (event: any) => {
		if (event.key === "Enter" && !State.isShowingInfo()) {
			Authenticator.login(this.currUsername, this.currPassword);
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	render() {
		return (
			<div className="login-page">
				<Page title="Login" />
				<div style={{ marginBottom: '50' }} />
				<div className="login-input">
					<LightTextInput
						id="username-input" 
						label="USERNAME"
						onChange={(e) => {
							this.currUsername = e.target.value;
						}}
					/>

					<div style={{ marginBottom: '30px' }} />

					<LightTextInput
						id="password-input"
						label="PASSWORD"
						type="password"
						onChange={(e) => {
							this.currPassword = e.target.value;
						}}
					/>
					<Button variant="text" size="small" onClick={() => {
						State.navigate("/register");
					}}>
						I don't have an account
					</Button>

					<div style={{ marginBottom: '30px' }} />

					<Button variant="contained" onClick={() => {
						Authenticator.login(this.currUsername, this.currPassword);
					}}>
						Login
					</Button>
				</div>
			</div>
		);
	}
}

export default Login;
