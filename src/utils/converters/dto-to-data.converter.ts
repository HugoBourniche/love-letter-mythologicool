import { LobbyDTO } from "../../objects/dtos/lobby.dto";
import { LobbyData } from "../../objects/data/lobby.data";
import { LobbyUserDTO } from "../../objects/dtos/users/lobby-user.dto";
import { LobbyUserData } from "../../objects/data/users/lobby-user.data";
import { GameOptionsDTO } from "../../objects/dtos/game/options/game-options.dto";
import { GameOptionsData } from "../../objects/data/game-options/game-options.data";
import { GameOptionsRangeDTO } from "../../objects/dtos/game/options/game-options-range.dto";
import { GameOptionRangeData } from "../../objects/data/game-options/game-option-range.data";
import { LoveLetterGameManagerData } from "../../objects/data/game/managers/love-letter-game-manager.data";
import { LoveLetterCardDTO } from "../../objects/dtos/game/cards/love-letter-card.dto";
import { LoveLetterCardData } from "../../objects/data/game/cards/love-letter-card.data";
import { LoverLetterGameManagerDTO } from "../../objects/dtos/game/managers/lover-letter-game-manager.dto";
import { LoveLetterPlayerDTO } from "../../objects/dtos/game/players/love-letter-player.dto";
import { LoveLetterPlayerData } from "../../objects/data/game/players/love-letter-player.data";
import { UserDTO } from "../../objects/dtos/users/user.dto";
import { UserData } from "../../objects/data/users/user.data";

export class DtoToDataConverter {
  // *****************************************************************************************************************
  // USER CONVERTERS
  // *****************************************************************************************************************

  public static user(userDTO: UserDTO): UserData {
    const user = new UserData();
    user.name = userDTO.name;
    return user;
  }

  // *****************************************************************************************************************
  // LOBBY CONVERTERS
  // *****************************************************************************************************************

  public static lobby(lobbyDTO: LobbyDTO): LobbyData {
    const lobby: LobbyData = new LobbyData();
    lobby.key = lobbyDTO.key;
    lobby.users = this.lobbyUsers(lobbyDTO.users);
    lobby.options = this.gameOptions(lobbyDTO.options);
    lobby.isInGame = lobbyDTO.inGame;
    return lobby;
  }

  public static lobbyUsers(usersDTO: LobbyUserDTO[]): LobbyUserData[] {
    const users: LobbyUserData[] = [];
    for (const userDTO of usersDTO) {
      users.push(this.lobbyUser(userDTO));
    }
    return users;
  }

  public static lobbyUser(userDTO: LobbyUserDTO): LobbyUserData {
    const user: LobbyUserData = new LobbyUserData();
    user.name = userDTO.name;
    user.isReady = userDTO.ready;
    user.isOwner = userDTO.owner;
    return user;
  }

  // *****************************************************************************************************************
  // GAME OPTIONS CONVERTERS
  // *****************************************************************************************************************

  public static gameOptions(gameOptionsDTO: GameOptionsDTO): GameOptionsData {
    const gameOptions = new GameOptionsData();
    gameOptions.maxPlayers = gameOptionsDTO.maxPlayers;
    gameOptions.ranges = this.gameOptionsRange(gameOptionsDTO.ranges);
    return gameOptions;
  }

  public static gameOptionsRange(
    gameOptionsRangeDTO: GameOptionsRangeDTO
  ): GameOptionRangeData {
    const gameOptionsRange = new GameOptionRangeData();
    gameOptionsRange.nbPlayersChoices = gameOptionsRangeDTO.nbPlayersChoices;
    return gameOptionsRange;
  }

  // *****************************************************************************************************************
  // GAME MANAGER CONVERTERS
  // *****************************************************************************************************************

  public static loveLetterGameManager(
    gameManagerDTO: LoverLetterGameManagerDTO
  ): LoveLetterGameManagerData {
    const gameManager = new LoveLetterGameManagerData();
    if (gameManagerDTO.currentPlayer) {
      gameManager.currentPlayer = this.loveLetterPlayer(gameManagerDTO.currentPlayer);
    }
    gameManager.players = this.loveLetterPlayers(gameManagerDTO.otherPlayers);
    gameManager.playerTurn = gameManagerDTO.playerTurn;
    gameManager.cardPile = this.loveLetterCards(gameManagerDTO.cardPile);
    gameManager.discardPile = this.loveLetterCards(gameManagerDTO.discardPile);
    gameManager.asidePile = this.loveLetterCards(gameManagerDTO.asideCard);
    return gameManager;
  }

  // *****************************************************************************************************************
  // PLAYERS CONVERTERS
  // *****************************************************************************************************************

  public static loveLetterPlayers(
    playerDTOs: LoveLetterPlayerDTO[]
  ): LoveLetterPlayerData[] {
    const players = [];
    for (const playerDTO of playerDTOs) {
      players.push(this.loveLetterPlayer(playerDTO));
    }
    return players;
  }

  public static loveLetterPlayer(
    playerDTO: LoveLetterPlayerDTO
  ): LoveLetterPlayerData {
    const player = new LoveLetterPlayerData();
    player.user = this.user(playerDTO.user);
    player.hand = this.loveLetterCards(playerDTO.hand);
    player.position = playerDTO.position;
    player.nbFavorPeace = playerDTO.nbFavorPeace;
    return player;
  }

  // *****************************************************************************************************************
  // CARDS CONVERTERS
  // *****************************************************************************************************************

  public static loveLetterCards(
    cardDTOs: LoveLetterCardDTO[]
  ): LoveLetterCardData[] {
    const cards = [];
    for (const cardDTO of cardDTOs) {
      cards.push(this.loveLetterCard(cardDTO));
    }
    return cards;
  }

  public static loveLetterCard(cardDTO: LoveLetterCardDTO): LoveLetterCardData {
    const card = new LoveLetterCardData();
    card.id = cardDTO.id;
    card.spriteId = cardDTO.spriteId;
    card.facingDown = cardDTO.facingDown;
    card.name = cardDTO.name;
    card.value = cardDTO.value;
    return card;
  }
}
