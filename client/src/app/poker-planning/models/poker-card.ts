import { User } from "../../auth/models/user.model";

export interface PokerCard {
  value: number;
  selected: boolean;
  user?: User
}