import * as Games from "./Games";

export function createState(inParentComponent){
    return{
		// --------------------------------------------------------
		// PROPERTIES
		// --------------------------------------------------------


		// if the waity dialog is visible
        pleaseWaitVisible: false,

        game_list : [ ],
        currentView : "welcome",

        gameID : null,
        gameName : null,
        gameDescription: null,


		// --------------------------------------------------------
		// METHODS
		// --------------------------------------------------------


		/**
		 * Shows or hides the please wait dialog during server calls.
		 *
		 * @param inVisible True to show the dialog, false to hide it.
		 */
        showHidePleaseWait : function(inVisible : boolean) : void {
            this.setState({ pleaseWaitVisible : inVisible });
        }.bind(inParentComponent),

        showGame : function(inID: string, inName: string, inDescription) : void{
            console.log("state.showGame()", inID, inName, inDescription);
            this.setState({ currentView : "game", gameID : inID, gameName : inName, gameDescription : inDescription });
        }.bind(inParentComponent),

        showAddGame : function(): void{
            console.log("state.showAddGame()");
            this.setState({ currentView : "gameAdd", gameID : null, gameName : "", gameDescription : "" });
        }.bind(inParentComponent),

        addGame : async function(): Promise<void> {
            console.log("state.addGame()", this.state.gameID, this.state.gameName, this.state.gameDescription);

            const cl = this.state.contacts.slice(0);
            
            this.state.showHidePleaseWait(true);
            const gamesWorker: Games.Worker = new Games.Worker();
            const game: Games.IGame_list =
                await gamesWorker.addGame({ name : this.state.gameName, description : this.state.gameDescription });
            this.state.showHidePleaseWait(false);
            
            cl.push(game);

            this.setState({ games : cl, gameID : null, gameName : "", gameDescription : ""});
        }.bind(inParentComponent),

        deleteGame : async function() : Promise<void> {
            console.log("state.deleteGame()", this.state.gameID);

            this.state.showHidePleaseWait(true);
            const gamesWorker: Games.Worker = new Games.Worker();
            await gamesWorker.deleteGame(this.state.gameID);
            this.state.showHidePleaseWait(false);

            const cl = this.state.games.filter( (inElement) => inElement._id != this.state.gameID);

            this.setState({ games:cl, gameID: null, gameName: "", gameDescription: "" });

        }.bind(inParentComponent),
    }
}
