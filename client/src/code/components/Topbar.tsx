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

			}} />
			<TopbarButton text="About" onClick={() => {

			}} />
			<TopbarButton text="Find Players" onClick={() => {

			}} />
			<TopbarButton text="Add Match" onClick={() => {

			}} />
		</div>
		<div className="topbar-right">
			<ProfileButton />
		</div>
	</div>
);

export default Topbar;
