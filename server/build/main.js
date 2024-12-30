"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const profiles_1 = __importDefault(require("./profiles"));
const matches_1 = __importDefault(require("./matches"));
const ratings_1 = __importDefault(require("./ratings"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
// cors
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});
// APIs
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth = new auth_1.default();
        const loginStatus = yield auth.login(req.body);
        res.json(loginStatus);
    }
    catch (error) {
        console.error("error on login: " + error);
    }
}));
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth = new auth_1.default();
        const registerStatus = yield auth.register(req.body);
        res.json(registerStatus);
    }
    catch (error) {
        console.error("error on registering: " + error);
    }
}));
app.post('/api/add-match', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matches = new matches_1.default();
        const match = req.body;
        const matchAddStatus = yield matches.add(req.body);
        if (matchAddStatus.success) {
            const ratings = new ratings_1.default();
            ratings.setRating(match.username, match.game, match.rating);
        }
        res.json(matchAddStatus);
    }
    catch (error) {
        console.error("error on adding match: " + error);
    }
}));
app.get("/api/profile/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = new profiles_1.default();
        const profile = yield profiles.getProfile(req.params.username);
        res.json(profile);
    }
    catch (error) {
        console.error("error on getting profile: " + error);
    }
}));
app.get("/api/ratings/game/:game", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ratings = new ratings_1.default();
        const rating = yield ratings.getGameRatings(Number(req.params.game));
        res.json(rating);
    }
    catch (error) {
        console.error("error on getting game ratings: " + error);
    }
}));
app.get("/api/ratings/player/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ratings = new ratings_1.default();
        const rating = yield ratings.getPlayerRatings(req.params.username);
        res.json(rating);
    }
    catch (error) {
        console.error("error on getting player ratings: " + error);
    }
}));
// client routing
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/dist/index.html"));
});
// start server
app.listen(8080, () => {
    console.log("Server is running.");
});
