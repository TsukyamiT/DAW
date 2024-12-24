import * as path from "path";
const Datastore = require("nedb");

export interface IGame_list {
    _id?: string, name: string, description: string;
}

export class Worker {
    private db: Nedb;
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "game_list.db"),
            autoload: true
        });
    }
    
    public listGames(): Promise<IGame_list[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({ }, 
                (inError: Error | null, inDocs: IGame_list[]) => {
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

    public listGamesID(inID: string): Promise<IGame_list> {
        return new Promise((inResolve, inReject) => {
            this.db.find({_id : inID}, 
                (inError: Error | null, inDocs: IGame_list) => {
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

    public listGamesName(inName: string): Promise<IGame_list[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({name : inName}, 
                (inError: Error | null, inDocs: IGame_list[]) => {
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

    public addGame(inGame: IGame_list): Promise<IGame_list> {
        return new Promise((inResolve, inReject) => {
            this.db.insert(inGame, 
                (inError: Error | null, inNewDoc: IGame_list) => {
                    if(inError){
                        inReject(inError);
                    }
                    else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    public deleteGameByID(inID: string): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ _id: inID }, {}, (inError: Error | null, inNumRemoved: number) => {
                if (inError) {
                    inReject(inError);
                } else if (inNumRemoved === 0) {
                    // If no document was removed, return an error
                    inReject(new Error(`No game found with ID: ${inID}`));
                } else {
                    inResolve();
                }
            });
        });
    }
    
    public deleteGameByName(inName: string): Promise<void> {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ name: inName }, {}, (inError: Error | null, inNumRemoved: number) => {
                if (inError) {
                    inReject(inError);
                } else if (inNumRemoved === 0) {
                    // If no document was removed, return an error
                    inReject(new Error(`No game found with name: ${inName}`));
                } else {
                    inResolve();
                }
            });
        });
    }
}