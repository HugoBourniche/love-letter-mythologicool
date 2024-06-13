import { UserDto } from "./user.dto";

export class LobbyUserDTO extends UserDto {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  public ready: boolean;
  public owner: boolean;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  constructor() {
    super();
    this.ready = false;
    this.owner = false;
  }
}
