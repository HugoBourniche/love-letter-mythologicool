import { UserDTO } from "../../users/user.dto";

export abstract class APlayerDTO {
  // *****************************************************************************************************************
  // ATTRIBUTES
  // *****************************************************************************************************************

  public user: UserDTO;

  // *****************************************************************************************************************
  // CONSTRUCTOR
  // *****************************************************************************************************************

  protected constructor() {
    this.user = new UserDTO();
  }
}
