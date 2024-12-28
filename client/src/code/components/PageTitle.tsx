import React from "react";

import Typography from "@mui/material/Typography";
import '@fontsource/roboto/700.css';

const PageTitle = ({title}) => (
	<div className="page-title">
		<Typography variant="h3">
			{title}
		</Typography>
	</div>
);

export default PageTitle;
