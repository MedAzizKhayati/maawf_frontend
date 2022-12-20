import { ChatService } from '@/app/services/chat/chat.service';
import { SendMessageDto } from '@/app/services/chat/send-message.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
})
export class ChatInputComponent implements OnInit {
  id = "";
  message = "";
  files: (File & { src: string })[] = [];

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  sendMessage() {
    if (this.message === "") return;
    const dto: SendMessageDto = {
      groupChatId: this.id,
      text: this.message
    };
    this.chatService.sendMessage(dto);
    this.message = "";
  }

  addFiles(event: any) {
    this.files = [...event.target.files];
    this.files.map(file => {
      file.src = URL.createObjectURL(file);
    });
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }
}
