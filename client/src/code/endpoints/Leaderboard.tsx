import React from "react";

import State from "../stateController";
import BaseLayout from "../components/BaseLayout";
import BannerButton from "../components/BannerButton";
import PageTitle from "../components/PageTitle";

import ggstBanner from "../../images/ggst_banner.png";
import lolBanner from "../../images/lol_banner.jpg";
import owBanner from "../../images/ow_banner.jpg";
import csBanner from "../../images/cs_banner.jpg";
import rlBanner from "../../images/rl_banner.jpg";
import valBanner from "../../images/val_banner.jpg";

const Leaderboard = () => (
	<div className="leaderboard">
		<BaseLayout />
		<PageTitle title="Leaderboard" />
	</div>
);


export default Leaderboard;
