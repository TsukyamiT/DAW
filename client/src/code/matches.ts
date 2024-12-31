import axios, { AxiosResponse } from "axios";
import { config } from "./config";
import State, { Game } from "./stateController";

export enum Result {
	none,
	win,
	loss,
	draw,
}

export interface IMatch {
	_id?: string,
	userid: string,
	date: Date,
	result: Result,
	game: Game,
	rating: number,
}

export type MatchData = {
	date: Date,
	result: Result,
	game: Game,
	rating: number,
	username: string,
	password: string,
}

export type MatchSuccess = {
	success: boolean,
	validLogin: boolean,
	validData: boolean,
}

export default class Matches {
	public static async add(game: Game, result: Result, rating: string): Promise<void> {
		try {
			const data: MatchData | null = this.getMatchData(game, result, rating);
			if (data === null) {
				return;
			}

			State.setLoading(true);
			const response: AxiosResponse = await axios.post(`${config.serverAddress}/api/add-match`, data);
			const responseSuccess: MatchSuccess = response.data;

			if (responseSuccess.success) {
				State.navigate("/leaderboard");
				State.showInfo("Add Match", "SUCCESS!");
			} else {
				let msg = "FAILED:";
				if (!responseSuccess.validData)
					msg += " invalid data!"
				else if (!responseSuccess.validLogin)
					msg += " invalid account!"
				else
					msg += " unknown error"
				State.showInfo("Add Match", msg);
			}

			State.setLoading(false);
		} catch (error) {
			console.error("error getting profile: " + error);
			State.setLoading(false);
		}
	}

	public static getMatchData(game: Game, result: Result, rating: string): MatchData | null {
		let errorStr = "";
		let data: MatchData = {
			date: new Date(),
			result: Result.none,
			game: Game.none,
			rating: -1,
			username: "",
			password: "",
		}

		// login data
		if (!State.isLoggedIn()) {
			State.showInfo("ERROR", "Not logged in!");
			return null;
		}
		data.username = State.getUsername();
		data.password = State.getPassword();

		// setting game
		if (game === Game.none) {
			if (errorStr !== "")
				errorStr += "\n";
			errorStr += "Please select a game.";
		}
		data.game = game;

		// setting result
		if (result === Result.none) {
			if (errorStr !== "")
				errorStr += "\n";
			errorStr += "Please select a result.";
		}
		data.result = result;

		// setting rating
		if (!this.isValidNumber(rating)) {
			if (errorStr !== "")
				errorStr += "\n";
			errorStr += "Please select a valid (numeric) rating.";
		}
		data.rating = parseInt(rating, 10);

		// setting date
		data.date = new Date(); // contains current date

		if (errorStr !== "") {
			State.showInfo("ERROR", errorStr);
			return null;
		}
		return data;
	}
	
	private static isValidNumber(str: string): boolean {
		return /^\d+$/.test(str);
	}

	public static async getAllMatches(): Promise<IMatch[]> {
		State.setLoading(true);
		try {
			const response: AxiosResponse = await axios.get(`${config.serverAddress}/api/matches`);
			const matches: IMatch[] = response.data;
			State.setLoading(false);
			return matches;
		} catch (error) {
			console.error("error getting matches: " + error);
			State.setLoading(false);
		}
		State.setLoading(false);
	}

	public static async getPlayerMatches(username: string): Promise<IMatch[]> {
		try {
			const response: AxiosResponse = await axios.get(`${config.serverAddress}/api/matches/${username}`);
			const matches: IMatch[] = response.data;
			return matches;
		} catch (error) {
			console.error("error getting player matches: " + error);
		}
	}
}
