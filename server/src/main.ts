import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";

import * as Game_list from "./game-list";
import { IGame_list } from "./game-list";
import * as Game_Player_list from "./game-player-list";
import { IGame_Player_list } from "./game-player-list";

const app : Express = express();

app.use(express.json());

app.use("/",
    express.static(path.join(__dirname, "../../client/dist"))
);

app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction){
    inResponse.header("Acces-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});

app.get("/game-list",
    async(inResquest: Request, inResponse: Response) => {
        try{
            const game_listWorker: Game_list.Worker = new Game_list.Worker();
            const game_list: IGame_list[] = await game_listWorker.listGames();
            inResponse.json(game_list);

        }
        catch(inError)
        {
            inResponse.send("error");
        }
    }
);

app.get("/game-list/:id",
    async(inResquest: Request, inResponse: Response) => {
        try{
            const game_listWorker: Game_list.Worker = new Game_list.Worker();
            const game_list: IGame_list = await game_listWorker.listGamesID(inResquest.params.id);
            inResponse.json(game_list);

        }
        catch(inError)
        {
            inResponse.send("error");
        }
    }
);

app.get("/game-list/name/:name", 
    async (inRequest: Request, inResponse: Response) => {
        try {
            const name = inRequest.params.name as string;

            const game_listWorker: Game_list.Worker = new Game_list.Worker();
            const game_list: IGame_list[] = await game_listWorker.listGamesName(name);
            
            inResponse.json(game_list);
        } catch (inError) {
            inResponse.send("error");
        }
    }
);

app.post("/game-list", 
    async(inRequest: Request, inResponse: Response) => {
        try{
            const game_listWorker: Game_list.Worker = new Game_list.Worker();
            const game_list: IGame_list = await game_listWorker.addGame(inRequest.body);
            inResponse.json(game_list);
        }
        catch(inError){
            inResponse.send("error");
        }
    }
);

app.post("/players",
    async(inRequest: Request, inResponse:Response) => {
        try {
            const game_player_listWorker: Game_Player_list.Worker = new Game_Player_list.Worker();
            const game_player_list: IGame_Player_list = await game_player_listWorker.addPlayer(inRequest.body);
            inResponse.json(game_player_list);
        } catch (inError) {
            inResponse.send("error");
        }
    }
)

app.get("/players",
    async(inResquest: Request, inResponse: Response) => {
        try{
            const game_player_listWorker: Game_Player_list.Worker = new Game_Player_list.Worker();
            const game_player_list: IGame_Player_list[] = await game_player_listWorker.listPlayers();
            inResponse.json(game_player_list);

        }
        catch(inError)
        {
            inResponse.send("error");
        }
    }
)

app.delete("/game-list/:id",
    async(inRequest: Request, inResponse: Response) => {
        try
        {
            const game_listWorker: Game_list.Worker = new Game_list.Worker();
            await game_listWorker.deleteGameByID(inRequest.params.id);
            inResponse.send("ok");
        }
        catch(inError){
            inResponse.send("error");
        }
    }
);

app.delete("/game-list/name/:name",
    async(inRequest: Request, inResponse: Response) => {
        try
        {
            const game_listWorker: Game_list.Worker = new Game_list.Worker();
            await game_listWorker.deleteGameByName(inRequest.params.name);
            inResponse.send("ok");
        }
        catch(inError){
            inResponse.send("error");
        }
    }
);


app.listen(8080);
