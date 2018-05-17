import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PrivateChatService {

  constructor(private http: HttpClient) { }

  getAllPrivateMessages(senderId: string, receiverId: string) {
    return this.http.get('api/private-chat/getAllMessages/', { params: { senderId, receiverId} })
      .map(messages => (messages as Array<any>).map(message => {
        return { from: { id: message.senderId, name: message.senderName, image: message.userImage }, content: message.message }
      }));
  }

  sendMessage(privateMessage: any){
    this.http.post('api/private-chat', privateMessage).subscribe();
  }

  changeReadStatus(lastUnreadMsgId: string) {
    return this.http.post('api/private-chat/readLastMessage/', { lastUnreadMessageId: lastUnreadMsgId });
  }

  loadUnreadMessages(userId: string){
    return this.http.get('/api/private-chat/getUnreadMessages/' + userId)
      .map(result => (result as Array<Object>).map(obj => obj['latest-message']));
  }

}
