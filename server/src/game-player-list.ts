import * as path from "path";
const Datastore = require("nedb");

export interface IGame_Player_list {
    _id?: string, game_name: string, nickname: string, rank_position: number;
}

export class Worker {
    private db: Nedb;
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "game_player_list.db"),
            autoload: true
        });

    }
    
    public listPlayers(): Promise<IGame_Player_list[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({ }, 
                (inError: Error | null, inDocs: IGame_Player_list[]) => {
                    if(inError){
                        inReject(inError);
                    }
                    else {
                        inResolve(inDocs);
                    }
                }
            )
        })
    }

    public listPlayersByGame(inGame_name: string): Promise<IGame_Player_list> {
        return new Promise((inResolve, inReject) => {
            this.db.find({game_name : inGame_name}, 
                (inError: Error | null, inDocs: IGame_Player_list) => {
                    if(inError){
                        inReject(inError);
                    }
                    else {
                        inResolve(inDocs);
                    }
                }
            )
        })
    }


    public addPlayer(inPlayer: IGame_Player_list): Promise<IGame_Player_list> {
        return new Promise((inResolve, inReject) => {
            this.db.find({ game_name: inPlayer.game_name, rank_position: inPlayer.rank_position }, 
                (inError: Error | null, inDocs: IGame_Player_list[]) => {
                    if (inError) {
                        inReject(inError);
                    }
                    else {
                        this.db.insert(inPlayer, 
                            (inError: Error | null, inNewDoc: IGame_Player_list) => {
                                if (inError) {
                                    inReject(inError);
                                } else {
                                    inResolve(inNewDoc);
                                }
                            }
                        );
                    }
                }
            );
        });
    }

    public deletePlayerByID(inID: string): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ _id: inID }, {}, (inError: Error | null, inNumRemoved: number) => {
                if (inError) {
                    inReject(inError);
                } else if (inNumRemoved === 0) {
                   inReject(new Error(`No player found with ID: ${inID}`));
                } else {
                    inResolve();
                }
            });
        });
    }
    
    public deletePlayerByName(inName: string): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ nickname: inName }, {}, (inError: Error | null, inNumRemoved: number) => {
                if (inError) {
                    inReject(inError);
                } else if (inNumRemoved === 0) {
                    inReject(new Error(`No player found with name: ${inName}`));
                } else {
                    inResolve();
                }
            });
        });
    }
}