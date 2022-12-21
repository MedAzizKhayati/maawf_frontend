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
  MAX_FILES = 24;
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
    if (this.message === "" && !this.files.length) return;
    const dto: SendMessageDto = {
      groupChatId: this.id,
      text: this.message,
      files: this.files,
    };
    if(!this.message)
      delete dto.text;
    this.chatService.httpSendMessage(dto);
    this.message = "";
    this.files = [];
  }

  addFiles(event: any) {
    if (event.target.files.length > this.MAX_FILES) {
      alert(`You can only upload ${this.MAX_FILES} files at a time.`);
    }
    this.files = [...event.target.files].slice(0, this.MAX_FILES);
    this.files.map(file => {
      file.src = URL.createObjectURL(file);
    });
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }
}
