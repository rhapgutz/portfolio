import { User } from "../../auth/models/user.model";

export interface UserMessage {
  _id?: string;
  user?: User;
  message: string;
}