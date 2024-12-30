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
class Profiles {
    constructor() {
        this.db = new nedb_1.default({
            filename: path.join(__dirname, "profiles.db"),
            autoload: true
        });
    }
    setPicture(username, picture) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = new auth_1.default();
            const id = yield auth.getUserId(username);
            const profile = yield this.find({ _id: id });
            const updated = yield this.update({ _id: id }, { _id: id, picture: picture, description: profile.description });
            if (!updated)
                console.error("couldn't update profile.");
        });
    }
    getPicture(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield this.getProfile(username);
            return profile.picture;
        });
    }
    getProfile(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = new auth_1.default();
            const id = yield auth.getUserId(username);
            const profile = yield this.find({ _id: id });
            return profile;
        });
    }
    find(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((inResolve, inReject) => {
                this.db.findOne(obj, (inError, inDocs) => {
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
exports.default = Profiles;
