import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const textColor = '#b4b4bf';

const theme = createTheme({
	palette: {
		primary: {
			main: textColor,
			light: textColor,
			dark: textColor,
			contrastText: textColor,
		},
	},
});

const TopbarButton = ({text, onClick}) => (
	<div>
		<ThemeProvider theme={theme}>
			<Button
				className="topbar-button"
				variant="text"
				color="primary"
				size="large"
				style={{ fontSize: '18px'}}
				onClick={onClick}>
				{text}
			</Button>
		</ThemeProvider>
	</div>
);

export default TopbarButton;
