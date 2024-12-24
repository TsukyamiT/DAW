"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
var path = require("path");
var Datastore = require("nedb");
var Worker = /** @class */ (function () {
    function Worker() {
        this.db = new Datastore({
            filename: path.join(__dirname, "game_player_list.db"),
            autoload: true
        });
    }
    Worker.prototype.listPlayers = function () {
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
    Worker.prototype.listPlayersByGame = function (inGame_name) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.find({ game_name: inGame_name }, function (inError, inDocs) {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inDocs);
                }
            });
        });
    };
    Worker.prototype.addPlayer = function (inPlayer) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.find({ game_name: inPlayer.game_name, rank_position: inPlayer.rank_position }, function (inError, inDocs) {
                if (inError) {
                    inReject(inError);
                }
                else {
                    _this.db.insert(inPlayer, function (inError, inNewDoc) {
                        if (inError) {
                            inReject(inError);
                        }
                        else {
                            inResolve(inNewDoc);
                        }
                    });
                }
            });
        });
    };
    Worker.prototype.deletePlayerByID = function (inID) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.remove({ _id: inID }, {}, function (inError, inNumRemoved) {
                if (inError) {
                    inReject(inError);
                }
                else if (inNumRemoved === 0) {
                    inReject(new Error("No player found with ID: ".concat(inID)));
                }
                else {
                    inResolve();
                }
            });
        });
    };
    Worker.prototype.deletePlayerByName = function (inName) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.remove({ nickname: inName }, {}, function (inError, inNumRemoved) {
                if (inError) {
                    inReject(inError);
                }
                else if (inNumRemoved === 0) {
                    inReject(new Error("No player found with name: ".concat(inName)));
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
