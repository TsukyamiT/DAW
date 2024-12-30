import axios, { AxiosResponse } from "axios";
import { config } from "./config";
import State from "./stateController";

export interface IProfile {
	_id?: string,
	picture: string,
	description: string,
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
