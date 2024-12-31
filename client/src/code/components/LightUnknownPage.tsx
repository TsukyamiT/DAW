import React from "react";

import Page from "./Page";
import Typography from "@mui/material/Typography";

const LightUnknownPage = () => (
	<div className="unknownPage">
		<Page title="Missing Page" />
		<Typography variant="h5" className="about-text">
			The page you are trying to view doesn't exist :(
		</Typography>
	</div>
);

export default LightUnknownPage;
