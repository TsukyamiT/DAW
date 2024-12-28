import { Component } from "react";
import pfpDefault from "../images/pfp_default.jpg";

export type ConfirmationCallback = (result: boolean) => void;

export enum Game {
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
	private static _isSignedIn = false;
	private static _username = "SIGN UP";
	private static _profilePicture = pfpDefault;

	// profile button widget
	private static _isShowingProfileButtonWidget = false;

	// --------------------------------------------------------
	// METHODS
	// --------------------------------------------------------

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

	// stuff that needs to be reset upon navigating
	public static navigationResetables()
	{
		this._isShowingProfileButtonWidget = false;
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
		return this._profilePicture;
	}

	public static getUsername(): string {
		return this._username;
	}

	public static isSignedIn(): boolean {
		return this._isSignedIn;
	}

	public static toggleProfileButtonWidget(): void {
		this._isShowingProfileButtonWidget = !this._isShowingProfileButtonWidget;
		this.update();
	}

	public static isShowingProfileButtonWidget(): boolean {
		return this._isShowingProfileButtonWidget;
	}
}

export default State
