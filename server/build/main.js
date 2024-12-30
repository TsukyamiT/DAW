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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = new auth_1.default();
    const loginStatus = yield auth.login(req.body);
    res.json(loginStatus);
}));
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = new auth_1.default();
    const registerStatus = yield auth.register(req.body);
    res.json(registerStatus);
}));
app.post('/api/add-match', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matches = new matches_1.default();
    const matchAddStatus = yield matches.add(req.body);
    res.json(matchAddStatus);
}));
app.get("/api/profile/:username", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profiles = new profiles_1.default();
    const profile = yield profiles.getProfile(req.params.username);
    res.json(profile);
}));
// client routing
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/dist/index.html"));
});
// app.get("/game-list",
//     async(inResquest: Request, inResponse: Response) => {
//         try{
//             const game_listWorker: Game_list.Worker = new Game_list.Worker();
//             const game_list: IGame_list[] = await game_listWorker.listGames();
//             inResponse.json(game_list);
//
//         }
//         catch(inError)
//         {
//             inResponse.send("error");
//         }
//     }
// );
//
// app.get("/game-list/:id",
//     async(inResquest: Request, inResponse: Response) => {
//         try{
//             const game_listWorker: Game_list.Worker = new Game_list.Worker();
//             const game_list: IGame_list = await game_listWorker.listGamesID(inResquest.params.id);
//             inResponse.json(game_list);
//
//         }
//         catch(inError)
//         {
//             inResponse.send("error");
//         }
//     }
// );
//
// app.get("/game-list/name/:name", 
//     async (inRequest: Request, inResponse: Response) => {
//         try {
//             const name = inRequest.params.name as string;
//
//             const game_listWorker: Game_list.Worker = new Game_list.Worker();
//             const game_list: IGame_list[] = await game_listWorker.listGamesName(name);
//             
//             inResponse.json(game_list);
//         } catch (inError) {
//             inResponse.send("error");
//         }
//     }
// );
//
// app.post("/game-list", 
//     async(inRequest: Request, inResponse: Response) => {
//         try{
//             const game_listWorker: Game_list.Worker = new Game_list.Worker();
//             const game_list: IGame_list = await game_listWorker.addGame(inRequest.body);
//             inResponse.json(game_list);
//         }
//         catch(inError){
//             inResponse.send("error");
//         }
//     }
// );
//
// app.post("/players",
//     async(inRequest: Request, inResponse:Response) => {
//         try {
//             const game_player_listWorker: Game_Player_list.Worker = new Game_Player_list.Worker();
//             const game_player_list: IGame_Player_list = await game_player_listWorker.addPlayer(inRequest.body);
//             inResponse.json(game_player_list);
//         } catch (inError) {
//             inResponse.send("error");
//         }
//     }
// )
//
// app.get("/players",
//     async(inResquest: Request, inResponse: Response) => {
//         try{
//             const game_player_listWorker: Game_Player_list.Worker = new Game_Player_list.Worker();
//             const game_player_list: IGame_Player_list[] = await game_player_listWorker.listPlayers();
//             inResponse.json(game_player_list);
//
//         }
//         catch(inError)
//         {
//             inResponse.send("error");
//         }
//     }
// )
//
// app.delete("/game-list/:id",
//     async(inRequest: Request, inResponse: Response) => {
//         try
//         {
//             const game_listWorker: Game_list.Worker = new Game_list.Worker();
//             await game_listWorker.deleteGameByID(inRequest.params.id);
//             inResponse.send("ok");
//         }
//         catch(inError){
//             inResponse.send("error");
//         }
//     }
// );
//
// app.delete("/game-list/name/:name",
//     async(inRequest: Request, inResponse: Response) => {
//         try
//         {
//             const game_listWorker: Game_list.Worker = new Game_list.Worker();
//             await game_listWorker.deleteGameByName(inRequest.params.name);
//             inResponse.send("ok");
//         }
//         catch(inError){
//             inResponse.send("error");
//         }
//     }
// );
app.listen(8080, () => {
    console.log("Server is running.");
});
