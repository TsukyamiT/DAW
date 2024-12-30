import React from "react";

import TopbarButton from "./TopbarButton";
import ProfileButton from "./ProfileButton";
import State from "../stateController";

const Topbar = () => (
	<div className="topbar">
		<div className="topbar-main">
			<TopbarButton text="Home" onClick={() => {
				State.navigate("/");
			}} />
			<TopbarButton text="Leaderboard" onClick={() => {
				State.navigate("/leaderboard");
			}} />
			<TopbarButton text="Stats" onClick={() => {
				State.navigate("/stats");
			}} />
			<TopbarButton text="About" onClick={() => {
				State.navigate("/about");
			}} />
			<TopbarButton text="Find Players" onClick={() => {
				State.navigate("/find");
			}} />
			<TopbarButton text="Add Match" onClick={() => {
				State.navigate("/add-match");
			}} />
		</div>
		<div className="topbar-right">
			<ProfileButton />
		</div>
	</div>
);

export default Topbar;
