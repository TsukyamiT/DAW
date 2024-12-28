import React, { Component } from "react";

import State, {Game} from "../stateController";
import BaseLayout from "../components/BaseLayout";
import BannerButton from "../components/BannerButton";
import PageTitle from "../components/PageTitle";

import ggstBanner from "../../images/ggst_banner.png";
import lolBanner from "../../images/lol_banner.jpg";
import owBanner from "../../images/ow_banner.jpg";
import csBanner from "../../images/cs_banner.jpg";
import rlBanner from "../../images/rl_banner.jpg";
import valBanner from "../../images/val_banner.jpg";

class FrontPage extends Component {
	constructor(props: {}) {
		super(props);
		State.setBaseComponent(this);
	}

	render() {
		return (
			<div className="frontpage">
				<BaseLayout />
				<PageTitle title="Choose your game" />
				<div className="frontpage-games">
					<div className="frontpage-left">
						<BannerButton banner={ggstBanner} onClick={() => {
							State.setCurrentGame(Game.ggst)
							State.navigate("/leaderboard");
						}} />
						<BannerButton banner={lolBanner} onClick={() => {
							State.setCurrentGame(Game.lol)
							State.navigate("/leaderboard");
						}} />
						<BannerButton banner={owBanner} onClick={() => {
							State.setCurrentGame(Game.ow)
							State.navigate("/leaderboard");
						}} />
					</div>
					<div className="frontpage-right">
						<BannerButton banner={csBanner} onClick={() => {
							State.setCurrentGame(Game.cs)
							State.navigate("/leaderboard");
						}} />
						<BannerButton banner={rlBanner} onClick={() => {
							State.setCurrentGame(Game.rl)
							State.navigate("/leaderboard");
						}} />
						<BannerButton banner={valBanner} onClick={() => {
							State.setCurrentGame(Game.val)
							State.navigate("/leaderboard");
						}} />
					</div>
				</div>
			</div>
		)
	}
}

export default FrontPage;
