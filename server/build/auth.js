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
class Authenticator {
    constructor() {
        this.db = new nedb_1.default({
            filename: path.join(__dirname, "auth.db"),
            autoload: true
        });
    }
    register(attempt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.registerExact(attempt.username, attempt.password);
        });
    }
    registerExact(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                validData: true,
                usernameExists: true,
                success: true,
            };
            response.validData = this.usernameValid(username) && this.passwordValid(password);
            response.usernameExists = response.validData ? yield this.usernameExists(username) : false;
            response.success = response.validData && !response.usernameExists;
            yield this.registerUser(username, password);
            return response;
        });
    }
    registerUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUsr = {
                username: username,
                password: password,
            };
            yield this.add(newUsr);
        });
    }
    login(attempt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.loginExact(attempt.username, attempt.password);
        });
    }
    isLoginCorrect(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.loginExact(username, password);
            return response.success;
        });
    }
    loginExact(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = {
                validData: true,
                usernameExists: true,
                success: true,
            };
            response.validData = this.usernameValid(username) && this.passwordValid(password);
            response.usernameExists = response.validData ? yield this.usernameExists(username) : false;
            response.success = response.validData && response.usernameExists;
            response.success = response.success ? yield this.validLogin(username, password) : response.success;
            return response;
        });
    }
    usernameValid(username) {
        if (username.length > Authenticator.usernameMaxSize || username.length < Authenticator.usernameMinSize)
            return false;
        if (!Authenticator.usernameValidChars.test(username))
            return false;
        return true;
    }
    passwordValid(password) {
        if (password.length > Authenticator.passwordMaxSize || password.length < Authenticator.passwordMinSize)
            return false;
        return true;
    }
    usernameExists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const matches = yield this.find({ username: username });
            return matches.length > 0;
        });
    }
    validLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const matches = yield this.find({ username: username });
            if (matches.length < 1)
                return false;
            return matches[0].password === password;
        });
    }
    getUserId(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUser(username);
            if (user._id == undefined)
                return "-1";
            return user._id;
        });
    }
    findUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((inResolve, inReject) => {
                this.db.findOne({ username: username }, (inError, inDocs) => {
                    if (inError)
                        inReject(inError);
                    else
                        inResolve(inDocs);
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
    add(obj) {
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
// constants
Authenticator.usernameMinSize = 3;
Authenticator.usernameMaxSize = 16;
Authenticator.usernameValidChars = new RegExp("^[a-zA-Z0-9_-]*$");
Authenticator.passwordMinSize = 3;
Authenticator.passwordMaxSize = 32;
exports.default = Authenticator;
