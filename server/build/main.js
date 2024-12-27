"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
// import * as Game_list from "./game-list";
// import { IGame_list } from "./game-list";
// import * as Game_Player_list from "./game-player-list";
// import { IGame_Player_list } from "./game-player-list";
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use("/*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
// });
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
app.get('/api/data', (req, res) => {
    res.send("OwO :3");
});
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Acces-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});
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
