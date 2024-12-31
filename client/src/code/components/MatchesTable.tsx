import React from "react";

import State, { Game } from "../stateController";

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
import { IMatch, Result } from "../matches";

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	}
})

function formatTime(date: Date): string {
	const theDate = new Date(date);
	return theDate.getFullYear() + "-" +
		theDate.getMonth() + "-" +
		theDate.getDate() + " at " + // actually returns day wtf
		theDate.getHours() + ":" +
		theDate.getMinutes() + ":" +
		theDate.getSeconds();
}

function formatGame(game: Game): string {
	switch (game) {
		case Game.ggst:
			return "Guilty Gear: Strive";
		case Game.lol:
			return "League of Legends";
		case Game.ow:
			return "Overwatch 2";
		case Game.cs:
			return "Counter Strike 2";
		case Game.rl:
			return "Rocket League";
		case Game.val:
			return "Valorant";
		case Game.none:
			return "none";
	}
}

function formatResult(result: Result): string {
	switch (result) {
		case Result.win:
			return "WIN";
		case Result.draw:
			return "DRAW";
		case Result.loss:
			return "LOSS";
	}
}

const MatchEntries = ({matches, page, rowsPerPage}: {matches: IMatch[], page: number, rowsPerPage: number}) => (
	<TableBody>
		{matches
			.sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime())
			.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
			.map((match: IMatch, index: number) => (
			<TableRow key={index}>
				<TableCell size="medium" scope="row" align="left"> 
					{formatGame(match.game)}
				</TableCell>
				<TableCell scope="row" align="left"> 
					{formatTime(match.date)}
				</TableCell>
				<TableCell scope="row" align="right"> 
					{match.rating}
				</TableCell>
				<TableCell scope="row" align="right"> 
					{formatResult(match.result)}
				</TableCell>
			</TableRow>
		))}
	</TableBody>
);


const MatchesTable = ({matches}: {matches: IMatch[]}) => {
	if (matches === undefined || matches.length == 0) {
		return (
			<Typography variant="h5" style={{textAlign: "center"}}>
				Could not find any matches.
			</Typography>
		)
	}

	const handleChangePage = (event: any, newPage: any) => {
		State.setMatchesPage(newPage);
	}

	const handleChangeRowsPerPage = (event: any) => {
		const rowsPerPage = parseInt(event.target.value, 10);
		State.setMatchesRowsPerPage(rowsPerPage);
	}

	return (
		<div>
			<ThemeProvider theme={darkTheme}>
				<Paper elevation={3}>
					<TableContainer>
						<Table sx={{ minWidth: 0 }} size="medium" aria-label="matches-table">
							<TableHead>
								<TableRow>
									<TableCell size="medium" align="left">Game</TableCell>
									<TableCell align="left">Date</TableCell>
									<TableCell align="right">rating</TableCell>
									<TableCell align="right">result</TableCell>
								</TableRow>
							</TableHead>
							<MatchEntries matches={matches} page={State.getMatchesPage()} rowsPerPage={State.getMatchesRowsPerPage()}/>
						</Table>
					</TableContainer>
					<TablePagination
							component="div"
							count={matches.length}
							page={State.getMatchesPage()}
							onPageChange={handleChangePage}
							rowsPerPage={State.getMatchesRowsPerPage()}
							onRowsPerPageChange={handleChangeRowsPerPage}
							rowsPerPageOptions={[10, 100, 1000]}
						  />
				</Paper>
			</ThemeProvider>
		</div>
	)
};

export default MatchesTable;
