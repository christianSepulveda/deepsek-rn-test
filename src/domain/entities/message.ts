import { User } from "./user";

export interface Message {
  _id: number;
  text: string;
  createdAt: Date;
  user: User;
}
