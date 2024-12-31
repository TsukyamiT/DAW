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
const path = __importStar(require("path"));
const nedb_1 = __importDefault(require("nedb"));
const auth_1 = __importDefault(require("./auth"));
class PlayerRatings {
    constructor() {
        this.db = new nedb_1.default({
            filename: path.join(__dirname, "player_ratings.db"),
            autoload: true
        });
    }
    getGameRatings(game) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.find({ game: game });
            return result;
        });
    }
    getPlayerRatings(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = new auth_1.default();
            const id = yield auth.getUserId(username);
            const result = yield this.find({ userid: id });
            return result;
        });
    }
    setRating(username, game, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = new auth_1.default();
            const id = yield auth.getUserId(username);
            const updated = yield this.update({ userid: id, game: game }, { userid: id, rating: rating, game: game, username: username });
            if (!updated)
                console.error("couldn't update rating.");
        });
    }
    updateUsername(oldUsername, newUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRating = (yield this.find({ username: oldUsername }))[0];
            if (userRating === undefined || userRating === null)
                return;
            const newUserRating = {
                userid: userRating.userid,
                game: userRating.game,
                rating: userRating.rating,
                username: newUsername,
            };
            const updated = yield this.update(userRating, newUserRating);
            if (!updated)
                console.error("couldn't update username in ratings.");
        });
    }
    deleteUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = new auth_1.default();
            const userid = yield auth.getUserId(username);
            yield this.delete({ userid: userid });
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
    update(obj, updatedObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = { upsert: true };
            return new Promise((inResolve, inReject) => {
                this.db.update(obj, updatedObj, options, (inError, numUpdated, upsert) => {
                    if (inError)
                        inReject(inError);
                    else
                        inResolve(numUpdated > 0);
                });
            });
        });
    }
}
exports.default = PlayerRatings;
