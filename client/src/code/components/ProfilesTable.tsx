import React from "react";

import State from "../stateController";
import { IPlayerRating } from "../ratings";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import Profiles, { IProfile } from "../profiles";

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	}
})

const ProfilePicture = ({profile}: {profile: IProfile}) => {
	if (profile.encodedPicture === undefined || profile.encodedPicture === null) {
		return (
			<img src={State.getDefaultProfilePicture()} alt="profilePicture" className="tiny-profile-picture" />
		);
	}
	return (
		<img src={
			URL.createObjectURL(
			Profiles.decodeFile(
			profile.encodedPicture))
		} alt="profilePicture" className="tiny-profile-picture" />
	);
}

const ProfileEntries = ({profiles, page, rowsPerPage}: {profiles: IProfile[], page: number, rowsPerPage: number}) => (
	<TableBody>
		{profiles
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			.map((profile: IProfile, index: number) => (
			<TableRow key={index}>
				<TableCell scope="row" align="left"> 
					<Button 
						className="leaderboard-button"
						variant="text"
						color="primary"
						size="large"
						onClick={() => {
							State.navigate("/profile/" + profile.username);
						}}>
						<ProfilePicture profile={profile}/>
						{profile.username}
					</Button>
				</TableCell>
			</TableRow>
		))}
	</TableBody>
);


const ProfilesTable = ({profiles}: {profiles: IProfile[]}) => {
	if (profiles === undefined || profiles.length == 0) {
		return (
			<Typography variant="h5" style={{textAlign: "center"}}>
				Could not find any players match that username.
			</Typography>
		)
	}

	const handleChangePage = (event: any, newPage: any) => {
		State.setSearchPage(newPage);
	}

	const handleChangeRowsPerPage = (event: any) => {
		const rowsPerPage = parseInt(event.target.value, 10);
		State.setSearchRowsPerPage(rowsPerPage);
	}

	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<Paper elevation={3}>
					<TableContainer>
						<Table sx={{ minWidth: 0 }} size="small" aria-label="players-table">
							<TableHead>
								<TableRow>
									<TableCell align="center">Player</TableCell>
								</TableRow>
							</TableHead>
							<ProfileEntries profiles={profiles} page={State.getSearchPage()} rowsPerPage={State.getSearchRowsPerPage()}/>
						</Table>
					</TableContainer>
					<TablePagination
							component="div"
							count={profiles.length}
							page={State.getSearchPage()}
							onPageChange={handleChangePage}
							rowsPerPage={State.getSearchRowsPerPage()}
							onRowsPerPageChange={handleChangeRowsPerPage}
							rowsPerPageOptions={[10, 100, 1000]}
						  />
				</Paper>
			</ThemeProvider>
		</div>
	)
};

export default ProfilesTable;
