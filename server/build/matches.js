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
exports.Game = exports.Result = void 0;
const path = __importStar(require("path"));
const nedb_1 = __importDefault(require("nedb"));
const auth_1 = __importDefault(require("./auth"));
var Result;
(function (Result) {
    Result[Result["none"] = 0] = "none";
    Result[Result["win"] = 1] = "win";
    Result[Result["loss"] = 2] = "loss";
    Result[Result["draw"] = 3] = "draw";
})(Result || (exports.Result = Result = {}));
var Game;
(function (Game) {
    Game[Game["none"] = 0] = "none";
    Game[Game["ggst"] = 1] = "ggst";
    Game[Game["lol"] = 2] = "lol";
    Game[Game["ow"] = 3] = "ow";
    Game[Game["cs"] = 4] = "cs";
    Game[Game["rl"] = 5] = "rl";
    Game[Game["val"] = 6] = "val";
})(Game || (exports.Game = Game = {}));
class Matches {
    constructor() {
        this.db = new nedb_1.default({
            filename: path.join(__dirname, "matches.db"),
            autoload: true
        });
    }
    add(match) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = new auth_1.default();
            let result = {
                success: true,
                validLogin: true,
                validData: true,
            };
            // check login
            if (!(yield auth.validLogin(match.username, match.password))) {
                result.success = false;
                result.validLogin = false;
            }
            // check data
            const tenMinutes = Date.now() - 600000;
            match.date = new Date(match.date); // fixes weird bug
            if (match.result === Result.none ||
                match.game === Game.none ||
                match.rating < 0 ||
                match.date.getTime() < tenMinutes ||
                match.date.getTime() > Date.now()) {
                result.success = false;
                result.validData = false;
            }
            if (result.success) {
                result.success = yield this.forceAdd(match);
                // const ratings = new PlayerRatings();
                // await ratings.setRating(match.username, match.game, match.rating);
            }
            return result;
        });
    }
    getAllMatches() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({});
        });
    }
    getPlayerMatches(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = new auth_1.default();
            const id = yield auth.getUserId(username);
            return yield this.find({ userid: id });
        });
    }
    forceAdd(match) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = new auth_1.default();
            let matchEntry = {
                userid: yield auth.getUserId(match.username),
                date: match.date,
                result: match.result,
                game: match.game,
                rating: match.rating,
            };
            try {
                yield this.addDb(matchEntry);
            }
            catch (error) {
                console.error(error);
                return false;
            }
            return true;
        });
    }
    deleteAll(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = new auth_1.default();
            const userid = yield auth.getUserId(username);
            yield this.delete({ userid: userid });
        });
    }
    find(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((inResolve, inReject) => {
                this.db.find(obj, (inError, inDocs) => {
                    if (inError)
                        inReject(inError);
                    else
                        inResolve(inDocs);
                });
            });
        });
    }
    delete(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((inResolve, inReject) => {
                this.db.remove(obj, (inError, n) => {
                    if (inError)
                        inReject(inError);
                    else
                        inResolve(n);
                });
            });
        });
    }
    addDb(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((inResolve, inReject) => {
                this.db.insert(obj, (inError, inNewDoc) => {
                    if (inError)
                        inReject(inError);
                    else
                        inResolve(inNewDoc);
                });
            });
        });
    }
}
exports.default = Matches;
