import React from "react";
import Button from "@mui/material/Button";
import GameIcon from "@mui/icons-material/Games";

const Topbar = ({ state }) => (
	<div>
		<Button
			variant="contained"
			color="primary"
			size="small"
			style={{ marginRight:10 }}
			onClick={() => {/* FIXME */}}>

			<GameIcon style={{ marginRight:10 }} />
			Guilty Gear
		</Button> <Button
			variant="contained"
			color="primary"
			size="small"
			style={{ marginRight:10 }}
			onClick={() => {/* FIXME */}}>

			<GameIcon style={{ marginRight:10 }} />
			Overwatch
		</Button>
	</div>
);

export default Topbar;
