import * as path from "path";
import Datastore from "nedb";

export type AuthSuccess = {
	success: boolean,
	usernameExists: boolean,
	validData: boolean,
}

export type LoginData = {
	username: string,
	password: string
}

export interface ILogin {
	_id?: string,
	username: string,
	password: string,
}

export default class Authenticator {
	// constants
	public static readonly usernameMinSize = 3;
	public static readonly usernameMaxSize = 16;
	public static readonly usernameValidChars = new RegExp("^[a-zA-Z0-9_-]*$");

	public static readonly passwordMinSize = 3;
	public static readonly passwordMaxSize = 32;

	// properties
	private db: Nedb;

	constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "auth.db"),
            autoload: true
        });
	}

	public async register(attempt: LoginData): Promise<AuthSuccess> {
		return await this.registerExact(attempt.username, attempt.password);
	}

	public async registerExact(username: string, password: string): Promise<AuthSuccess> {
		let response: AuthSuccess = {
			validData: true,
			usernameExists: true,
			success: true,
		};

		response.validData = this.usernameValid(username) && this.passwordValid(password);
		response.usernameExists = response.validData ? await this.usernameExists(username) : false;
		response.success = response.validData && !response.usernameExists;

		await this.registerUser(username, password);

		return response;
	}

	private async registerUser(username: string, password: string): Promise<void> {
		const newUsr: ILogin = {
			username: username,
			password: password,
		}
		await this.add(newUsr);
	}

	public async login(attempt: LoginData): Promise<AuthSuccess> {
		return await this.loginExact(attempt.username, attempt.password);
	}

	public async isLoginCorrect(username: string, password: string): Promise<boolean> {
		const response = await this.loginExact(username, password);
		return response.success;
	}

	public async loginExact(username: string, password: string): Promise<AuthSuccess> {
		let response: AuthSuccess = {
			validData: true,
			usernameExists: true,
			success: true,
		};

		response.validData = this.usernameValid(username) && this.passwordValid(password);
		response.usernameExists = response.validData ? await this.usernameExists(username) : false;
		response.success = response.validData && response.usernameExists;

		response.success = response.success ? await this.validLogin(username, password) : response.success;

		return response;
	}

	public usernameValid(username: string): boolean {
		if (username.length > Authenticator.usernameMaxSize || username.length < Authenticator.usernameMinSize)
			return false;

		if (!Authenticator.usernameValidChars.test(username))
			return false
		return true;
	}

	public passwordValid(password: string): boolean {
		if (password.length > Authenticator.passwordMaxSize || password.length < Authenticator.passwordMinSize)
			return false;
		return true;
	}

	public async usernameExists(username: string): Promise<boolean> {
		const matches = await this.find({ username: username });
		return matches.length > 0;
	}

	public async validLogin(username: string, password: string): Promise<boolean> {
		const matches = await this.find({ username: username });
		if (matches.length < 1)
			return false;
		return matches[0].password === password;
	}

	public async getUserId(username: string): Promise<string> {
		const user = await this.findUser(username);
		if (user === undefined || user === null || user._id === undefined)
			return "-1";
		return user._id;
	}

	public async findUser(username: string): Promise<ILogin> {
		return new Promise<ILogin> ((inResolve, inReject) => {
			this.db.findOne({ username: username }, 
                (inError: Error | null, inDocs: ILogin) => {
                    if (inError)
                        inReject(inError);
                    else
                        inResolve(inDocs);
                }
			);
		});
	}

	public async validate(username: string, password: string): Promise<AuthSuccess> {
		let response: AuthSuccess = {
			validData: true,
			usernameExists: true,
			success: true,
		};

		response.validData = this.usernameValid(username) && this.passwordValid(password);
		response.usernameExists = response.validData ? await this.usernameExists(username) : false;
		response.success = response.validData && !response.usernameExists;

		return response;
	}

	public async updateUser(oldLogin: LoginData, newLogin: LoginData): Promise<AuthSuccess> {
		const success = await this.validate(newLogin.username, newLogin.password);
		if (success.validData && success.usernameExists && oldLogin.username === newLogin.username) {
			// user didn't change username but it will trigger the "username already exists"
			success.usernameExists = false;
			success.success = true;
		}
		const id = this.getUserId(oldLogin.username);
		if (success.success) {
			const updated = await this.update(
				{ username: oldLogin.username },
				{ username: newLogin.username, password: newLogin.password });
			if (!updated) {
				success.success = false;
				console.error("couldn't update auth.");
			}
		}
		return success;
	}

	public async deleteUser(username: string) {
		await this.delete({ username: username });
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

	public async find(obj: {}): Promise<ILogin[]> {
		return new Promise<ILogin[]> ((inResolve, inReject) => {
			this.db.find(obj, 
                (inError: Error | null, inDocs: ILogin[]) => {
                    if (inError)
                        inReject(inError);
                    else
                        inResolve(inDocs);
                }
			);
		});
	}

	public async add(obj: ILogin): Promise<ILogin> {
        return new Promise((inResolve, inReject) => {
			this.db.insert(obj,
				(inError: Error | null, inNewDoc: ILogin) => {
					if (inError)
						inReject(inError);
					else
						inResolve(inNewDoc);
				}
			);
		});
	}
}
