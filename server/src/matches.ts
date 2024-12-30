import * as path from "path";
import Datastore from "nedb";

import Authenticator from "./auth";
import Profiles from "./profiles";

export enum Result {
	none,
	win,
	loss,
	draw,
}

export enum Game {
	none,
	ggst,
	lol,
	ow,
	cs,
	rl,
	val,
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
	private db: Nedb;

	constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "matches.db"),
            autoload: true
        });
	}

	public async add(match: MatchData): Promise<MatchSuccess> {
		const auth = new Authenticator();
		let result: MatchSuccess = {
			success: true,
			validLogin: true,
			validData: true,
		}

		// check login
		if (!(await auth.validLogin(match.username, match.password))) {
			result.success = false;
			result.validLogin = false;
		}

		// check data
		const tenMinutes = Date.now() - 600000;
		match.date = new Date(match.date) // fixes weird bug
		if (match.result === Result.none ||
			match.game === Game.none ||
			match.rating < 0 ||
			match.date.getTime() < tenMinutes ||
			match.date.getTime() > Date.now())
		{
			result.success = false;
			result.validData = false;
		}

		if (result.success) {
			result.success = await this.forceAdd(match);
			const profiles = new Profiles();
			await profiles.setRating(match.username, match.rating);
		}

		return result;
	}

	public async forceAdd(match: MatchData): Promise<boolean> {
		const auth = new Authenticator();
		let matchEntry: IMatch = {
			userid: await auth.getUserId(match.username),
			date: match.date,
			result: match.result,
			game: match.game,
			rating: match.rating,
		}

		try {
			await this.addDb(matchEntry);
		} catch (error) {
			console.error(error);
			return false;
		}
		return true;
	}

	public async addDb(obj: IMatch): Promise<IMatch> {
        return new Promise((inResolve, inReject) => {
			this.db.insert(obj,
				(inError: Error | null, inNewDoc: IMatch) => {
					if (inError)
						inReject(inError);
					else
						inResolve(inNewDoc);
				}
			);
		});
	}
}
