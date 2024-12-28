import React from "react";

const BannerButton = ({banner, onClick}) => (
	<div className="bannerButton">
		<button className="bannerButton_button">
			<img src={banner} alt="bannerButton" className="bannerButton_banner" onClick={onClick}/>
		</button>
	</div>
);

export default BannerButton;
