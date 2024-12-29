import React, { Component } from "react";

import State from "../stateController";
import Authenticator from "../auth";
import Page from "../components/Page";
import LightTextInput from "../components/LightTextInput";
import Button from "@mui/material/Button";

class Register extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	currUsername = "";
	currPassword = "";

	render() {
		return (
			// purposefully using login stuff - take care!
			<div className="login-page">
				<Page title="Register " />
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
						State.navigate("/login");
					}}>
						I already have an account
					</Button>

					<div style={{ marginBottom: '30px' }} />

					<Button variant="contained" onClick={() => {
						Authenticator.register(this.currUsername, this.currPassword);
					}}>
						Register
					</Button>
				</div>
			</div>
		);
	}
}

export default Register;
