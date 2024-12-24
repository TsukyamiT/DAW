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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var express_1 = require("express");
var Game_list = require("./game-list");
var Game_Player_list = require("./game-player-list");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Acces-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-COntrol-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});
app.get("/game-list", function (inResquest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var game_listWorker, game_list, inError_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                game_listWorker = new Game_list.Worker();
                return [4 /*yield*/, game_listWorker.listGames()];
            case 1:
                game_list = _a.sent();
                inResponse.json(game_list);
                return [3 /*break*/, 3];
            case 2:
                inError_1 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/game-list/:id", function (inResquest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var game_listWorker, game_list, inError_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                game_listWorker = new Game_list.Worker();
                return [4 /*yield*/, game_listWorker.listGamesID(inResquest.params.id)];
            case 1:
                game_list = _a.sent();
                inResponse.json(game_list);
                return [3 /*break*/, 3];
            case 2:
                inError_2 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/game-list/name/:name", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, game_listWorker, game_list, inError_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name_1 = inRequest.params.name;
                game_listWorker = new Game_list.Worker();
                return [4 /*yield*/, game_listWorker.listGamesName(name_1)];
            case 1:
                game_list = _a.sent();
                inResponse.json(game_list);
                return [3 /*break*/, 3];
            case 2:
                inError_3 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/game-list", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var game_listWorker, game_list, inError_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                game_listWorker = new Game_list.Worker();
                return [4 /*yield*/, game_listWorker.addGame(inRequest.body)];
            case 1:
                game_list = _a.sent();
                inResponse.json(game_list);
                return [3 /*break*/, 3];
            case 2:
                inError_4 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/players", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var game_player_listWorker, game_player_list, inError_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                game_player_listWorker = new Game_Player_list.Worker();
                return [4 /*yield*/, game_player_listWorker.addPlayer(inRequest.body)];
            case 1:
                game_player_list = _a.sent();
                inResponse.json(game_player_list);
                return [3 /*break*/, 3];
            case 2:
                inError_5 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/players", function (inResquest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var game_player_listWorker, game_player_list, inError_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                game_player_listWorker = new Game_Player_list.Worker();
                return [4 /*yield*/, game_player_listWorker.listPlayers()];
            case 1:
                game_player_list = _a.sent();
                inResponse.json(game_player_list);
                return [3 /*break*/, 3];
            case 2:
                inError_6 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete("/game-list/:id", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var game_listWorker, inError_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                game_listWorker = new Game_list.Worker();
                return [4 /*yield*/, game_listWorker.deleteGameByID(inRequest.params.id)];
            case 1:
                _a.sent();
                inResponse.send("ok");
                return [3 /*break*/, 3];
            case 2:
                inError_7 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete("/game-list/name/:name", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var game_listWorker, inError_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                game_listWorker = new Game_list.Worker();
                return [4 /*yield*/, game_listWorker.deleteGameByName(inRequest.params.name)];
            case 1:
                _a.sent();
                inResponse.send("ok");
                return [3 /*break*/, 3];
            case 2:
                inError_8 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(8080);
