import * as path from "path";
import Datastore from "nedb";

import Authenticator, { ILogin } from "./auth";
import { Game } from "./matches";

export interface IProfile {
	_id?: string,
	userid: string,
	username?: string // WARNING: username is actually saved in the auth table
	picture?: string,
	description?: string,
}

export default class Profiles {
	private db: Nedb;

	constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "profiles.db"),
            autoload: true
        });
	}

	public async createProfile(username: string) {
		const auth = new Authenticator();
		const id: string = await auth.getUserId(username);
		if (!(await this.exists(id)))
			await this.add({ userid: id, username: username});
	}

	public async exists(userid: string) {
		const profile: IProfile = await this.find({ userid: userid });
		if (profile === undefined || profile === null || profile.userid === undefined)
			return false;
		return true;
	}

	public async setPicture(username: string, picture: string): Promise<void> {
		const auth = new Authenticator();
		const id: string = await auth.getUserId(username);
		const updated = await this.update(
			{ userid: id },
			{ userid: id, picture: picture });
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
		if (id !== "-1") {
			await this.createProfile(username);
		}
		const profile: IProfile = await this.find({ userid: id });
		return profile;
	}

	public async setDesc(username: string, desc: string): Promise<void> {
		const auth = new Authenticator();
		const id: string = await auth.getUserId(username);
		const updated = await this.update(
			{ userid: id },
			{ userid: id, description: desc });
		if (!updated)
			console.error("couldn't update profile.");
	}

	public async deleteUser(username: string) {
		const auth = new Authenticator();
		const userid = await auth.getUserId(username);
		await this.delete({ userid: userid });
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


	public async add(obj: IProfile): Promise<IProfile> {
        return new Promise((inResolve, inReject) => {
			this.db.insert(obj,
				(inError: Error | null, inNewDoc: IProfile) => {
					if (inError)
						inReject(inError);
					else
						inResolve(inNewDoc);
				}
			);
		});
	}
}
