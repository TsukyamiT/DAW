import * as path from "path";
import Datastore from "nedb";

import Authenticator, { ILogin } from "./auth";

export interface IProfile {
	_id?: string,
	userid: string,
	picture?: string,
	description?: string,
	rating?: number,
}

export default class Profiles {
	private db: Nedb;

	constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "profiles.db"),
            autoload: true
        });
	}

	public async setPicture(username: string, picture: string): Promise<void> {
		const auth = new Authenticator();
		const id: string = await auth.getUserId(username);
		const profile: IProfile = await this.find({ _id: id });
		const updated = await this.update(
			{ userid: id },
			{ picture: picture });
		if (!updated)
			console.error("couldn't update profile.");
	}

	public async getPicture(username: string): Promise<string | undefined> {
		const profile: IProfile = await this.getProfile(username);
		return profile.picture;
	}
	
	public async getProfile(username: string): Promise<IProfile> {
		const auth = new Authenticator();
		const id: string = await auth.getUserId(username);
		const profile: IProfile = await this.find({ _id: id });
		return profile;
	}

	public async setRating(username: string, rating: number): Promise<void> {
		const auth = new Authenticator();
		const id: string = await auth.getUserId(username);
		const profile: IProfile = await this.find({ _id: id });
		const updated = await this.update(
			{ userid: id },
			{ rating: rating });
		if (!updated)
			console.error("couldn't update profile.");
	}

	public async setDesc(username: string, desc: string): Promise<void> {
		const auth = new Authenticator();
		const id: string = await auth.getUserId(username);
		const profile: IProfile = await this.find({ _id: id });
		const updated = await this.update(
			{ userid: id },
			{ description: desc });
		if (!updated)
			console.error("couldn't update profile.");
	}

	private async find(obj: {}): Promise<IProfile> {
		return new Promise<IProfile> ((inResolve, inReject) => {
			this.db.findOne(obj, 
                (inError: Error | null, inDocs: IProfile) => {
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
