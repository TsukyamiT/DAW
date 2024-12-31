import { Component } from "react";
import Authenticator from "./auth";
import defaultPfp from "../images/pfp_default.jpg";
import Profiles, { IProfile } from "./profiles";

export type ConfirmationCallback = (result: boolean) => void;

export enum Game {
	none,
	ggst,
	lol,
	ow,
	cs,
	rl,
	val,
}

export abstract class State {
	// --------------------------------------------------------
	// PROPERTIES
	// --------------------------------------------------------

	// base component that will be updated
	private static _baseComponent: Component;

	// if the loading screen should be shown
	private static _isLoading = false;

	// if the info screen should be shown
	private static _isShowingInfo = false;
	private static _infoTitle = "";
	private static _infoContents = "";

	// if the confirmations creen should be shown
	private static _isShowingConfirmation = false;
	private static _confirmationContents = "";
	private static _confirmationCallback = null;

	// the navigator function to navigate to different endpoints
	private static _navigator = null;

	private static _currentGame = Game.ggst;

	// user attributes
	private static readonly defaultPassword = "";
	private static readonly defaultUsername = "SIGN UP";
	private static _isSignedIn = false;
	private static _username = this.defaultUsername;
	private static _password = this.defaultPassword;
	private static _profilePicture: File;
	private static _profilePictureURL: string = defaultPfp;

	// profile button widget
	private static _isShowingProfileButtonWidget = false;

	// leaderboard
	private static _leaderboardPage = 0;
	private static _leaderboardRowsPerPage = 100;

	// profile page
	private static _viewProfile: IProfile;

	// edit profile persistant variables. Need to be reset on naviationResetables
	public static editUsername = "";
	public static editPassword = "";
	public static editDescription = "";
	public static editImageFile: File;
	public static editImage = State.getDefaultProfilePicture();

	// --------------------------------------------------------
	// METHODS
	// --------------------------------------------------------

	// stuff that needs to be reset upon navigating
	public static navigationResetables()
	{
		this._isShowingProfileButtonWidget = false;
		this._leaderboardPage = 0;
		this._leaderboardRowsPerPage = 100;
		this._viewProfile = undefined;
			
		// edit profile resets
		this.setupEditProfileVars();
	}

	public static setBaseComponent(component: Component) {
		this._baseComponent = component
	}

	public static setNavigator(navigator: (arg: string) => void) {
		this._navigator = navigator;
	}

	public static navigate(endpoint: string) {
		this.navigationResetables();
		this._navigator(endpoint);
	}

	public static setLoading(value: boolean): void {
		State._isLoading = value;
		State.update();
	}

	public static showInfo(title: string, contents: string): void {
		State._infoTitle = title;
		State._infoContents = contents;
		State._isShowingInfo = true;
		State.update();
	}

	public static stopShowingInfo(): void {
		State._isShowingInfo = false;
		State.update();
	}

	public static showConfirmation(contents: string, callback: ConfirmationCallback): void {
		State._confirmationContents = contents;
		State._confirmationCallback = callback;
		State._isShowingConfirmation = true;
		State.update();
	}

	public static stopShowingConfirmation(): void {
		State._isShowingConfirmation = false;
		State.update();
	}

	public static confirmationContents(): string {
		return this._confirmationContents;
	}

	public static confirmationCallback(): ConfirmationCallback {
		return this._confirmationCallback;
	}

	public static isLoading(): boolean {
		return this._isLoading;
	}

	public static isShowingInfo(): boolean {
		return this._isShowingInfo;
	}

	public static infoTitle(): string {
		return this._infoTitle;
	}

	public static infoContents(): string {
		return this._infoContents;
	}

	public static isShowingConfirmation(): boolean {
		return this._isShowingConfirmation;
	}

	public static update(): void {
		if (this._baseComponent === undefined || this._baseComponent === null) {
			console.error("no base component to update");
			return;
		}

		console.log("rendering");
		this._baseComponent.setState({});
	}

	public static setCurrentGame(game: Game): void {
		this._currentGame = game;
	}

	public static currentGame(): Game {
		return this._currentGame;
	}

	public static getProfilePicture(): string {
		return this._profilePictureURL;
	}

	public static getUsername(): string {
		return this._username;
	}

	public static getPassword(): string {
		return this._password;
	}

	public static isSignedIn(): boolean {
		return this._isSignedIn;
	}

	public static isLoggedIn(): boolean {
		return this.isSignedIn();
	}

	public static toggleProfileButtonWidget(): void {
		this._isShowingProfileButtonWidget = !this._isShowingProfileButtonWidget;
		this.update();
	}

	public static turnOffButtonWidget(): void {
		if (!this._isShowingProfileButtonWidget)
			return;
		this.toggleProfileButtonWidget();
	}

	public static isShowingProfileButtonWidget(): boolean {
		return this._isShowingProfileButtonWidget;
	}

	public static login(username: string, password: string, img: File | null) {
		this._isSignedIn = true;
		this._username = username;
		this._password = password;
		if (img == null || img === undefined) {
			this._profilePictureURL = defaultPfp;
		} else {
			this._profilePicture = img;
			if (img)
				this._profilePictureURL = URL.createObjectURL(img);
		}
		this.update();
	}

	public static logout() {
		this._isSignedIn = false;
		this._username = this.defaultUsername;
		this._password = this.defaultPassword;
		this._profilePictureURL = defaultPfp;
		this._profilePicture = undefined;
		this.update();
	}

	public static getLeaderboardPage() {
		return this._leaderboardPage;
	}

	public static setLeaderboardPage(value: number) {
		this._leaderboardPage = value;
		this.update();
	}

	public static getLeaderboardRowsPerPage() {
		return this._leaderboardRowsPerPage;
	}

	public static setLeaderboardRowsPerPage(value: number) {
		this._leaderboardRowsPerPage = value;
		this.update();
	}

	public static setViewProfile(value: IProfile) {
		this._viewProfile = value;
		this.setupEditProfileVars();
		this.update();
	}

	public static setupEditProfileVars() {
		if (State.getViewProfile() !== undefined && State.getViewProfile() !== null) {
			this.editUsername = State.getViewProfile().username;
			this.editPassword = State.getPassword();
			this.editDescription = State.getViewProfile().description;
			// this.editImageFile = State.getViewProfile().picture;
			if (State.getViewProfile().encodedPicture !== undefined &&
				State.getViewProfile().encodedPicture !== null) {
				this.editImageFile = Profiles.decodeFile(State.getViewProfile().encodedPicture);
				console.log(State.getViewProfile().encodedPicture);
				this.editImage = URL.createObjectURL(this.editImageFile);
			}
		}
		else {
			this.editUsername = "";
			this.editPassword = "";
			this.editDescription = "";
			this.editImageFile = undefined;
			this.editImage = State.getDefaultProfilePicture();
		}
	}

	public static getViewProfile() {
		return this._viewProfile;
	}

	public static getDefaultProfilePicture() {
		return defaultPfp;
	}
}

export default State
