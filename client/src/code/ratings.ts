import axios, { AxiosResponse } from "axios";
import { config } from "./config";
import State, { Game } from "./stateController";

export interface IPlayerRating {
	_id?: string,
	userid: string,
	game: Game,
	rating: number,
	username?: string,
}

export default class PlayerRatings {
	public static async getUserRatings(username: string): Promise<IPlayerRating[]> {
		try {
			const response: AxiosResponse = await axios.get(`${config.serverAddress}/api/ratings/player/${username}`);
			const ratings: IPlayerRating[] = response.data;
			if (ratings === undefined || ratings.length === undefined || ratings.length == 0 || ratings[0] === undefined || ratings[0].userid === undefined)
				throw new Error("not of type IPlayerRating[]");
			return ratings;
		} catch (error) {
			console.error("error getting profile: " + error);
		}
	}
	public static async getGameRatings(game: Game): Promise<IPlayerRating[]> {
		try {
			const response: AxiosResponse = await axios.get(`${config.serverAddress}/api/ratings/game/${game}`);
			const ratings: IPlayerRating[] = response.data;
			if (ratings === undefined || ratings.length === undefined || ratings.length == 0 || ratings[0] === undefined || ratings[0].userid === undefined)
				throw new Error("not of type IPlayerRating[]");
			return ratings;
		} catch (error) {
			console.error("error getting profile: " + error);
		}
	}
}
