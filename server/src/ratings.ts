import * as path from "path";
import Datastore from "nedb";

import Authenticator, { ILogin } from "./auth";
import { Game } from "./matches";

export interface IPlayerRating {
	_id?: string,
	userid: string,
	game: Game,
	rating: number,
	username?: string, // WARNING actually in auth
}

export default class PlayerRatings {
	private db: Nedb;

	constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "player_ratings.db"),
            autoload: true
        });
	}

	public async getGameRatings(game: Game): Promise<IPlayerRating[]> {
		const result = await this.find({ game: game });
		return result;
	}

	public async getPlayerRatings(username: string): Promise<IPlayerRating[]> {
		const auth = new Authenticator();
		const id = await auth.getUserId(username);
		const result = await this.find({ userid: id });
		return result;
	}

	public async setRating(username: string, game: Game, rating: number): Promise<void> {
		const auth = new Authenticator();
		const id = await auth.getUserId(username);
		const updated = await this.update(
			{ userid: id, game: game },
			{ userid: id, rating: rating, game: game, username: username });
		if (!updated)
			console.error("couldn't update profile.");
	}

	public async deleteUser(username: string) {
		const auth = new Authenticator();
		const userid = await auth.getUserId(username);
		await this.delete({ userid: userid });
	}

	public async delete(obj: {}): Promise<number> {
		return new Promise<number> ((inResolve, inReject) => {
			this.db.remove(obj, 
                (inError: Error | null, n: number) => {
                    if (inError)
                        inReject(inError);
                    else
                        inResolve(n);
                }
			);
		});
	}

	private async find(obj: {}): Promise<IPlayerRating[]> {
		return new Promise<IPlayerRating[]> ((inResolve, inReject) => {
			this.db.find(obj, 
                (inError: Error | null, inDocs: IPlayerRating[]) => {
                    if (inError)
                        inReject(inError);
                    else
                        inResolve(inDocs);
                }
			);
		});
	}

	public async update(obj: {}, updatedObj: {}): Promise<boolean> {
		const options: Nedb.UpdateOptions = { upsert: true }
        return new Promise((inResolve, inReject) => {
			this.db.update(obj, updatedObj, options, 
				(inError: Error | null, numUpdated: number, upsert: boolean) => {
					if (inError)
						inReject(inError);
					else
						inResolve(numUpdated > 0);
				}
			);
		});
	}
}
