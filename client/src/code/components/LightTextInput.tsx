import React, { ChangeEventHandler, Component } from "react";

import State from "../stateController";
import TextField from "@mui/material/TextField"
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider, Theme, useTheme } from "@mui/material/styles"

const lightInputTheme = (outerTheme: Theme) => createTheme({
	palette: {
		mode: outerTheme.palette.mode,
	},
	components: {
		MuiSelect: {
			styleOverrides: {
				select: {
					color: '#E0E3E7',
				}
			}
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'--TextField-brandBorderColor': '#6F7E8C',
					'--TextField-brandBorderHoverColor': '#B2BAC2',
					'--TextField-brandBorderFocusedColor': '#E0E3E7',
					'& label.Mui-focused': {
						color: 'var(--TextField-brandBorderFocusedColor)',
					},
					'& label': {
						color: 'var(--TextField-brandBorderColor)',
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					borderColor: 'var(--TextField-brandBorderColor)',
				},
				root: {
					color: 'var(--TextField-brandBorderFocusedColor)', // color of the inputted text
					[`&:hover .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: 'var(--TextField-brandBorderHoverColor)',
					},
					[`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: 'var(--TextField-brandBorderFocusedColor)',
					},
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					'&::before, &::after': {
						borderBottom: '2px solid var(--TextField-brandBorderColor)',
					},
					'&:hover:not(.Mui-disabled, .Mui-error):before': {
						borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
					},
					'&.Mui-focused:after': {
						borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
					},
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				root: {
					'&::before': {
						borderBottom: '2px solid var(--TextField-brandBorderColor)',
					},
					'&:hover:not(.Mui-disabled, .Mui-error):before': {
						borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
					},
					'&.Mui-focused:after': {
						borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
					},
				},
			},
		},
	},
});

type layout = {
	id : string,
	label : string,
	type? : string,
	onChange? : ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
}

export default function LightTextInput(layout: layout) {
	const outerTheme = useTheme();
	return (
		<div>
			<ThemeProvider theme={lightInputTheme(outerTheme)}>
				<TextField
					id={layout.id}
					label={layout.label}
					type={layout.type}
					onChange={layout.onChange}
					variant="outlined" />
			</ThemeProvider>
		</div>
	);
}
