"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
var path = require("path");
var Datastore = require("nedb");
var Worker = /** @class */ (function () {
    function Worker() {
        this.db = new Datastore({
            filename: path.join(__dirname, "game_list.db"),
            autoload: true
        });
    }
    Worker.prototype.listGames = function () {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.find({}, function (inError, inDocs) {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inDocs);
                }
            });
        });
    };
    Worker.prototype.listGamesID = function (inID) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.find({ _id: inID }, function (inError, inDocs) {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inDocs);
                }
            });
        });
    };
    Worker.prototype.listGamesName = function (inName) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.find({ name: inName }, function (inError, inDocs) {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inDocs);
                }
            });
        });
    };
    Worker.prototype.addGame = function (inGame) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.insert(inGame, function (inError, inNewDoc) {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inNewDoc);
                }
            });
        });
    };
    Worker.prototype.deleteGameByID = function (inID) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.remove({ _id: inID }, {}, function (inError, inNumRemoved) {
                if (inError) {
                    inReject(inError);
                }
                else if (inNumRemoved === 0) {
                    // If no document was removed, return an error
                    inReject(new Error("No game found with ID: ".concat(inID)));
                }
                else {
                    inResolve();
                }
            });
        });
    };
    Worker.prototype.deleteGameByName = function (inName) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.remove({ name: inName }, {}, function (inError, inNumRemoved) {
                if (inError) {
                    inReject(inError);
                }
                else if (inNumRemoved === 0) {
                    // If no document was removed, return an error
                    inReject(new Error("No game found with name: ".concat(inName)));
                }
                else {
                    inResolve();
                }
            });
        });
    };
    return Worker;
}());
exports.Worker = Worker;
