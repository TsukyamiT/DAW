import axios, { AxiosResponse } from "axios";
import { config } from "./config";
import State from "./stateController";
import Profiles from "./profiles";

export type AuthSuccess = {
	success: boolean,
	usernameExists: boolean,
	validData: boolean,
}
 
export type LoginData = {
	username: string,
	password: string
}

export class AuthErrors {
	// constants

	public static readonly usernameMinSize = 3;
	public static readonly usernameMaxSize = 16;
	public static readonly usernameValidChars = new RegExp("^[a-zA-Z0-9_-]*$");

	public static readonly passwordMinSize = 3;
	public static readonly passwordMaxSize = 32;

	public static readonly usernameInvalidLengthString = `invalid length (${AuthErrors.usernameMinSize}-${AuthErrors.usernameMaxSize})`
	public static readonly usernameInvalidCharsString = `invalid characters (a-z, A-Z, 0-9, _ and -)`

	public static readonly passwordInvalidLengthString = `invalid length (${AuthErrors.passwordMinSize}-${AuthErrors.passwordMaxSize})`

	// flags
	public usernameValid: boolean;
	public usernameValidLength: boolean;
	public usernameValidCharacters: boolean;

	public passwordValid: boolean;
	public passwordValidLength: boolean;

	// properties
	public usernameErrorString: string;
	public passwordErrorString: string;

	constructor() {
		this.usernameValid = true;
		this.usernameValidLength = true;
		this.usernameValidCharacters = true;

		this.passwordValid = true;
		this.passwordValidLength = true;

		// this.usernameExists = true;
		// this.passwordMatches = true;

		this.usernameErrorString = "";
		this.passwordErrorString = "";
	}

	public validateUsername(username: string): void {
		this.usernameErrorString = "";
		if (username.length > AuthErrors.usernameMaxSize || username.length < AuthErrors.usernameMinSize)
		{
			this.usernameValid = false;
			this.usernameValidLength = false;
			if (this.usernameErrorString !== "")
				this.usernameErrorString += ", "
			this.usernameErrorString += AuthErrors.usernameInvalidLengthString;
		}

		if (!AuthErrors.usernameValidChars.test(username)) {
			this.usernameValid = false;
			this.usernameValidCharacters = false;
			if (this.usernameErrorString !== "")
				this.usernameErrorString += ", "
			this.usernameErrorString += AuthErrors.usernameInvalidCharsString;
		}
	}

	public validatePassword(password: string): void {
		this.passwordErrorString = "";
		if (password.length > AuthErrors.passwordMaxSize || password.length < AuthErrors.passwordMinSize)
		{
			this.passwordValid = false;
			this.passwordValidLength = false;
			if (this.passwordErrorString !== "")
				this.passwordErrorString += ", "
			this.passwordErrorString += AuthErrors.passwordInvalidLengthString;
		}
	}
}

export default class Authenticator {
	public static async login(username: string, password: string): Promise<void> {
		State.setLoading(true);
		if (!this.validate(username, password))
			return;

		const responseSuccess = await this.attemptLogin(username, password);

		if (responseSuccess.success)
		{
			const profile = await Profiles.getProfile(username);
			let picture: string | null;
			if (profile == null)
				picture = null;
			else
				picture = profile.picture;
			State.login(username, password, picture);
			State.navigate("/leaderboard");
			State.showInfo("Login", "SUCCESS!");
		}
		else
		{
			let msg = "FAILED: ";
			if (!responseSuccess.validData)
				msg += "invalid login/password!"
			else if (!responseSuccess.usernameExists)
				msg += "username doesn't exist!"
			else
				msg += "wrong password!"
			State.showInfo("Login", msg);
		}
		State.setLoading(false);
	}

	private static validate(username: string, password: string): boolean {
		let errors = new AuthErrors;
		errors.validateUsername(username);
		errors.validatePassword(password);
		
		let errorStr = "";
		if (!errors.usernameValid)
			errorStr += "INVALID USERNAME: " + errors.usernameErrorString;
		if (!errors.passwordValid)
		{
			if (errorStr !== "")
				errorStr += "\n";
			errorStr += "INVALID PASSWORD: " + errors.passwordErrorString;
		}

		if (errorStr !== "")
		{
			State.showInfo("Error", errorStr);
			return false;
		}
		return true;
	}

	private static async attemptLogin(username: string, password: string): Promise<AuthSuccess> {
		try {
			const loginAttempt: LoginData = {
				username: username,
				password: password,
			}
			const response: AxiosResponse = await axios.post(`${config.serverAddress}/api/login`, loginAttempt);
			const responseSuccess: AuthSuccess = response.data;
			return responseSuccess;
		} catch (error) {
			console.error("error logging in: " + error);
		}
	}

	public static async register(username: string, password: string): Promise<void> {
		State.setLoading(true);
		if (!this.validate(username, password))
			return;

		const responseSuccess = await this.attemptRegister(username, password);

		if (responseSuccess.success)
		{
			State.navigate("/login");
			State.showInfo("Register", "SUCCESS!");
		}
		else
		{
			let msg = "FAILED: ";
			if (!responseSuccess.validData)
				msg += "invalid login/password!"
			else if (responseSuccess.usernameExists)
				msg += "username already taken!"
			else
				msg += "you should not be seeing this error (invalid state)"
			State.showInfo("Register", msg);
		}
		State.setLoading(false);
	}

	private static async attemptRegister(username: string, password: string): Promise<AuthSuccess> {
		try {
			const data: LoginData = {
				username: username,
				password: password,
			}
			const response: AxiosResponse = await axios.post(`${config.serverAddress}/api/register`, data);
			const responseSuccess: AuthSuccess = response.data;
			return responseSuccess;
		} catch (error) {
			console.error("error registering: " + error);
		}
	}
}
