import React, { Component } from "react";

import State from "../stateController";
import Page from "../components/Page";
import SearchBar from "../components/SearchBar";
import Profiles, { IProfile } from "../profiles";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import ProfilesTable from "../components/ProfilesTable";

export default class Find extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this)
	}

	private searchUsername = "";


	handleKeyPress = async (event: any) => {
		if (event.key === "Enter" && !State.isShowingInfo() && this.searchUsername.length > 0) {
			State.setSearchedProfiles(await Profiles.getMatchingProfiles(this.searchUsername));
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
			<div className="find">
				<Page title="Find Players" />
				<SearchBar
					id="username-input" 
					label="SEARCH USERNAME"
					defaultValue={State.editUsername}
					onChange={(e) => {
						this.searchUsername = e.target.value;
					}}
				/>

				<div style={{ marginBottom: '50px' }} />

				<div className="profiles-area">
					<div className="profiles-table">
						<ProfilesTable profiles={State.getSearchedProfiles()} />
					</div>
				</div>
			</div>
		);
	}
}
