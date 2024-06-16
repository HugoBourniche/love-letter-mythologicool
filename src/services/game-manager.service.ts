import { LoveLetterGameStatusResponse } from "../objects/responses/love-letter-game-status.response";
import { LoveLetterGameInitializationRequest } from "../objects/requests/love-letter-game-initialization.request";
import { LoveLetterGameStatusRequest } from "../objects/requests/love-letter-game-status.request";

export class GameManagerService {
  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {}

  // *****************************************************************************************************************
  // REQUESTS
  // *****************************************************************************************************************

  public async initializeGame(lobbyKey: string) {
    console.log("Initialize Game");
    const requestObject = new LoveLetterGameInitializationRequest(lobbyKey);
    const response = await fetch(
      "http://localhost:9143/loveletter/classic/initialize",
      {
        method: "POST",
        body: JSON.stringify(requestObject),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Can not Initialize Game");
    }
  }

  public async gameStatus(lobbyKey: string, userName: string) {
    const requestObject = new LoveLetterGameStatusRequest(lobbyKey, userName);
    const response = await fetch(
      "http://localhost:9143/loveletter/classic/status",
      {
        method: "POST",
        body: JSON.stringify(requestObject),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Can not fetch Game status");
    }
    return (await response.json()) as LoveLetterGameStatusResponse;
  }
}
