import { LoveLetterInitializationGameResponse } from "../objects/responses/love-letter-initialization-game.response";
import { LoveLetterGameInitializationRequest } from "../objects/requests/love-letter-game-initialization.request";

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
      throw new Error("Initialize Game");
    }
    return (await response.json()) as LoveLetterInitializationGameResponse;
  }
}
