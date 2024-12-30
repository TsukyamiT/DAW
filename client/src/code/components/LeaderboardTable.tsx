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

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	}
})

const Scores = ({ratings, page, rowsPerPage}: {ratings: IPlayerRating[], page: number, rowsPerPage: number}) => (
	<TableBody>
		{ ratings
			.sort((x, y) => y.rating - x.rating)
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			.map((rating: IPlayerRating, index: number) => (
			<TableRow
				key={index}
				sx={{ height: 10 }}
			>
				<TableCell sx={{ width: "10px" }} align="left">{index + 1}</TableCell>
				<TableCell scope="row"> 
					<Button 
						className="leaderboard-button"
						variant="text"
						color="primary"
						size="large"
						onClick={() => {
							State.navigate("/profile/" + rating.username);
						}}>
						{rating.username}
					</Button>
				</TableCell>
				<TableCell align="right">{rating.rating}</TableCell>
			</TableRow>
		))}
	</TableBody>
);

const LeaderboardTable = ({ratings}: {ratings: IPlayerRating[]}) => {
	if (ratings === undefined || ratings.length == 0) {
		return (
			<Typography variant="h5" style={{textAlign: "center"}}>
				Could not find any ratings for this leaderboard.
			</Typography>
		)
	}

	const handleChangePage = (event: any, newPage: any) => {
		State.setLeaderboardPage(newPage);
	}

	const handleChangeRowsPerPage = (event: any) => {
		const rowsPerPage = parseInt(event.target.value, 10);
		State.setLeaderboardRowsPerPage(rowsPerPage);
	}

	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<Paper elevation={3}>
					<TableContainer>
						<Table sx={{ minWidth: 650 }} size="small" aria-label="leaderboard-table">
							<TableHead>
								<TableRow>
									<TableCell sx={{ width: "10px" }}></TableCell>
									<TableCell align="left">Player</TableCell>
									<TableCell align="right">rating</TableCell>
								</TableRow>
							</TableHead>
							<Scores ratings={ratings} page={State.getLeaderboardPage()} rowsPerPage={State.getLeaderboardRowsPerPage()}/>
						</Table>
					</TableContainer>
					<TablePagination
							component="div"
							count={ratings.length}
							page={State.getLeaderboardPage()}
							onPageChange={handleChangePage}
							rowsPerPage={State.getLeaderboardRowsPerPage()}
							onRowsPerPageChange={handleChangeRowsPerPage}
							rowsPerPageOptions={[10, 100, 1000]}
						  />
				</Paper>
			</ThemeProvider>
		</div>
	)
};

export default LeaderboardTable;
