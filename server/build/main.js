"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const Game_list = __importStar(require("./game-list"));
const Game_Player_list = __importStar(require("./game-player-list"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Acces-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});
app.get("/game-list", (inResquest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game_listWorker = new Game_list.Worker();
        const game_list = yield game_listWorker.listGames();
        inResponse.json(game_list);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.get("/game-list/:id", (inResquest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game_listWorker = new Game_list.Worker();
        const game_list = yield game_listWorker.listGamesID(inResquest.params.id);
        inResponse.json(game_list);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.get("/game-list/name/:name", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = inRequest.params.name;
        const game_listWorker = new Game_list.Worker();
        const game_list = yield game_listWorker.listGamesName(name);
        inResponse.json(game_list);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.post("/game-list", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game_listWorker = new Game_list.Worker();
        const game_list = yield game_listWorker.addGame(inRequest.body);
        inResponse.json(game_list);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.post("/players", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game_player_listWorker = new Game_Player_list.Worker();
        const game_player_list = yield game_player_listWorker.addPlayer(inRequest.body);
        inResponse.json(game_player_list);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.get("/players", (inResquest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game_player_listWorker = new Game_Player_list.Worker();
        const game_player_list = yield game_player_listWorker.listPlayers();
        inResponse.json(game_player_list);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.delete("/game-list/:id", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game_listWorker = new Game_list.Worker();
        yield game_listWorker.deleteGameByID(inRequest.params.id);
        inResponse.send("ok");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.delete("/game-list/name/:name", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game_listWorker = new Game_list.Worker();
        yield game_listWorker.deleteGameByName(inRequest.params.name);
        inResponse.send("ok");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.listen(8080);
