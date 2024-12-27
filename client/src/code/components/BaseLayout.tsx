// React imports.
import React, { Component, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

// Library imports.
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// App imports.
import { createState } from "../state";
import Topbar from "./Topbar";

/**
 * BaseLayout.
 */
class BaseLayout extends Component {
	/**
	 * State data for the app.  This also includes all mutator functions for manipulating state.  That way, we only
	 * ever have to pass this entire object down through props (not necessarily the best design in terms of data
	 * encapsulation, but it does have the benefit of being quite a bit simpler).
	 */
	state = createState(this);

	private data = "";

	private async fetchData() {
		try {
			const response = await axios.get("http://127.0.0.1:8080/api/data");
			console.log(response.data);
			this.data = response.data;
		} catch (err) {
			console.log(err.message);
		}
	}

	componentDidMount() {
		this.fetchData().then(() => {
			this.setState({})
			console.log("fetched");
		});
	}

	/**
	 * Render().
	 */
	render() {
		console.log("rendering");
		return ((
			<div className="appContainer">
				<Dialog
					open={ this.state.pleaseWaitVisible }
					disableEscapeKeyDown={ true }
					transitionDuration={ 0 }>
					<DialogTitle style={{ textAlign:"center" }}>Please Wait</DialogTitle>
					<DialogContent><DialogContentText>...Contacting server...</DialogContentText></DialogContent>
				</Dialog>
				<div className="topbar">
					<Topbar state={ this.state } />
				</div>
				<h1>
					Hello, {this.data}.
				</h1>
			</div>
		));
	}
}


export default BaseLayout;
