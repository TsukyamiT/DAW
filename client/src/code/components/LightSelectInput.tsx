import React, { ChangeEventHandler, Component, ReactNode } from "react";

import TextField from "@mui/material/TextField"
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider, Theme, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const lightInputTheme = (outerTheme: Theme) => createTheme({
	palette: {
		mode: outerTheme.palette.mode,
	},
	components: {
		MuiSelect: {
			styleOverrides: {
				root: {
					'--SelectField-brandBorderColor': '#6F7E8C',
					'--SelectField-brandBorderHoverColor': '#B2BAC2',
					'--SelectField-brandBorderFocusedColor': '#E0E3E7',
					color: 'var(--SelectField-brandBorderFocusedColor)', // text
					'&:hover:not(.Mui-disabled)': {
						// backgroundColor: '#B2BAC2' // hover background
					},
					'&.Mui-focused': {
						// color: '#B2BAC2', // focused text
					},
				},
				outlined: {
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: 'var(--SelectField-brandBorderFocusedColor)' // outline focused
					},
					'.MuiOutlinedInput-notchedOutline': {
						borderColor: 'var(--SelectField-brandBorderColor)', // outline color
					},
				},
				icon: {
					color: 'var(--SelectField-brandBorderFocusedColor)', // text
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					'--SelectField-brandBorderColor': '#6F7E8C',
					'--SelectField-brandBorderHoverColor': '#B2BAC2',
					'--SelectField-brandBorderFocusedColor': '#E0E3E7',
					color: 'var(--SelectField-brandBorderColor)',
					'&.Mui-focused': {
						color: 'var(--SelectField-brandBorderFocusedColor)'
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					borderColor: 'var(--SelectField-brandBorderColor)',
				},
				root: {
					color: 'var(--SelectField-brandBorderFocusedColor)', // color of the inputted text
					[`&:hover .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: 'var(--SelectField-brandBorderHoverColor)',
					},
					[`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
						borderColor: 'var(--SelectField-brandBorderFocusedColor)',
					},
				},
			},
		},
	},
});

type layout = {
	label: string,
	items: string[],
	onChange?: (event: SelectChangeEvent<string>, child: ReactNode) => void,
}

export default function LightSelectInput(layout: layout) {
	const outerTheme = useTheme();
	return (
		<div>
			<ThemeProvider theme={lightInputTheme(outerTheme)}>
				<FormControl fullWidth>
					<InputLabel> {layout.label} </InputLabel>
					<Select
						label={layout.label}
						defaultValue=""
						onChange={layout.onChange === undefined ? () => {} : layout.onChange}>
						{layout.items.map((str, index) => (
							<MenuItem key={index} value={index}> {str} </MenuItem>
						))}
					</Select>
				</FormControl>
			</ThemeProvider>
		</div>
	);
}
