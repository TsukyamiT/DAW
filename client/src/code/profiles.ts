import axios, { AxiosResponse } from "axios";
import { config } from "./config";
import State, { Game } from "./stateController";
import { AuthSuccess, LoginData } from "./auth";
import fs from "fs";

export interface IProfile {
	_id?: string,
	userid: string,
	username?: string,
	encodedPicture?: string,
	description?: string,
}

export type ProfileUpdateRequest = {
	login: LoginData,
	newUsername?: string,
	newPassword?: string,
	newPicture?: string,
	newDescription?: string,
}

export default class Profiles {
	public static async encodeFile(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				resolve(reader.result as string);
			}
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	public static decodeFile(baseString: string): File {
		if (baseString === undefined)
			return undefined;
		const baseData = baseString.split(',')[1];
		const binaryString = atob(baseData);
		const byteArray = new Uint8Array(binaryString.length);
		for (let i = 0; i < binaryString.length; i++) {
			byteArray[i] = binaryString.charCodeAt(i);
		}

		const filename = "image.png";
		const mimeType = "image/png";
		const blob = new Blob([byteArray], { type: mimeType, })
		const file = new File([blob], filename, { type: mimeType });
		return file;
	}

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
		State.setLoading(false);
	}

	public static async getAllProfiles(): Promise<IProfile[]> {
		State.setLoading(true);
		try {
			const response: AxiosResponse = await axios.get(`${config.serverAddress}/api/profiles`);
			const profiles: IProfile[] = response.data;
			State.setLoading(false);
			return profiles;
		} catch (error) {
			console.error("error getting profile: " + error);
			State.setLoading(false);
		}
		State.setLoading(false);
	}

	public static async getMatchingProfiles(regex: string): Promise<IProfile[]> {
		State.setLoading(true);
		try {
			const response: AxiosResponse = await axios.get(`${config.serverAddress}/api/find/profiles/${regex}`);
			const profiles: IProfile[] = response.data;
			console.log("got " + profiles.length + " matches");
			State.setLoading(false);
			return profiles;
		} catch (error) {
			console.error("error getting profile: " + error);
			State.setLoading(false);
		}
		State.setLoading(false);
	}

	public static async update(profileUpdateRequest: ProfileUpdateRequest): Promise<AuthSuccess> {
		State.setLoading(true);
		try {
			console.log(profileUpdateRequest.newPicture);
			const response: AxiosResponse = await axios.post(`${config.serverAddress}/api/update-profile/`, profileUpdateRequest);
			const success: AuthSuccess = response.data;
			State.setLoading(false);
			return success;
		} catch (error) {
			console.error("error getting profile: " + error);
			State.setLoading(false);
		}
	}

	public static async delete(username: string, password: string): Promise<boolean> {
		State.setLoading(true);
		try {
			const login: LoginData = {
				username: username,
				password: password,
			}
			const response: AxiosResponse = await axios.delete(`${config.serverAddress}/api/delete/profile`, { data: login } );
			const success: boolean = response.data;
			State.setLoading(false);
			return success;
		} catch (error) {
			console.error("error deleting profile: " + error);
			State.setLoading(false);
		}
	}
}
