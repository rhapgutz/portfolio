import { Socket } from "ngx-socket-io";
import { UserMessage } from "../../models/user-message.model";

export class UserMessageSocketService {
  constructor(
    private socket: Socket
  ) {

  }

  sendMessage(userMessage: UserMessage): void {
    this.socket.emit('sendMessageToServer', userMessage);
  }

  getMessage() {
    return this.socket.fromEvent<any>('sendMessageToClients');
  }
}