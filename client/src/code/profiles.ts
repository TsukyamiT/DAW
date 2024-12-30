import axios, { AxiosResponse } from "axios";
import { config } from "./config";
import State, { Game } from "./stateController";

export interface IProfile {
	_id?: string,
	userid: string,
	username?: string,
	picture?: string,
	description?: string,
	rating?: number,
}

export type ProfileData = {
	username: string,
	password: string,
	picture?: string,
	description?: string,
	rating?: number,

	newUsername?: string,
	newPassword?: string,
}

export default class Profiles {
	public static async getProfile(username: string): Promise<IProfile> {
		State.setLoading(true);
		try {
			const response: AxiosResponse = await axios.get(`${config.serverAddress}/api/profile/${username}`);
			const profile: IProfile = response.data;
			State.setLoading(false);
			return profile;
		} catch (error) {
			console.error("error getting profile: " + error);
			State.setLoading(false);
		}
	}
}
