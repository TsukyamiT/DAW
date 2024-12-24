import axios, { AxiosResponse } from "axios";
// import { config } from "./config";

export interface IGame_list { _id?: number, name: string, description: string }

const gamesFile = "games";

export class Worker {

  public async listGames(): Promise<IGame_list[]> {

   console.log("Games.Worker.listGames()");

    const response: AxiosResponse = await axios.get(`${gamesFile}/game-list`);
    return response.data;

  }

  public async addGame(InGame_list: IGame_list): Promise<IGame_list> {

    console.log("Games.Worker.addGame()", InGame_list);

    const response: AxiosResponse = await axios.post(`${gamesFile}/game-list`, InGame_list);
    return response.data;

  }

  public async deleteGame(inID): Promise<void> {

    console.log("Games.Worker.deleteGameByID()", inID);

    await axios.delete(`${gamesFile}/game-list/${inID}`);

  } 
}
