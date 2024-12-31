import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";

import Authenticator, { ILogin, LoginData } from "./auth";
import Profiles, { IProfile } from "./profiles";
import Matches, { Game, MatchData } from "./matches";
import PlayerRatings from "./ratings";

const app : Express = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../../client/dist")))

// cors
app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction){
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});

// APIs
app.post('/api/login', async (req, res) => {
	try {
		const auth = new Authenticator();
		const loginStatus = await auth.login(req.body);
		res.json(loginStatus);
	} catch (error) {
		console.error("error on login: " + error);
	}
});

app.post('/api/register', async (req, res) => {
	try {
		const auth = new Authenticator();
		const login: LoginData = req.body;
		const registerStatus = await auth.register(login);
		if (registerStatus.success) {
			const profiles = new Profiles();
			profiles.createProfile(login.username);
		}
		res.json(registerStatus);
	} catch (error) {
		console.error("error on registering: " + error);
	}
});

app.post('/api/add-match', async (req, res) => {
	try {
		const matches = new Matches();
		const match: MatchData = req.body;
		const matchAddStatus = await matches.add(req.body);
		if (matchAddStatus.success) {
			const ratings = new PlayerRatings();
			ratings.setRating(match.username, match.game, match.rating);
		}
		res.json(matchAddStatus);
	} catch (error) {
		console.error("error on adding match: " + error);
	}
});

app.get("/api/profile/:username", async (req, res) => {
	try {
		const profiles = new Profiles();
		const profile = await profiles.getProfile(req.params.username);
		res.json(profile);
	} catch (error) {
		console.error("error on getting profile: " + error);
	}
})

app.get("/api/ratings/game/:game", async (req, res) => {
	try {
		const ratings = new PlayerRatings();
		const rating: IProfile[] = await ratings.getGameRatings(Number(req.params.game));
		res.json(rating);
	} catch (error) {
		console.error("error on getting game ratings: " + error);
	}
})

app.get("/api/ratings/player/:username", async (req, res) => {
	try {
		const ratings = new PlayerRatings();
		const rating: IProfile[] = await ratings.getPlayerRatings(req.params.username);
		res.json(rating);
	} catch (error) {
		console.error("error on getting player ratings: " + error);
	}
})




// client routing
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, "../../client/dist/index.html"))
});

// start server
app.listen(8080, () => {
	console.log("Server is running.");
});
