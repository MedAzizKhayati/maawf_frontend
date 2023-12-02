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

  onDrop(e: DragEvent) {
    e.preventDefault();
    const items: DataTransferItem[] = Array.from(e.dataTransfer?.items || []);
    const images = items.filter(x => /image/i.test(x.type));
    if (images.length) {
      images.forEach((image) => {
        const file = image.getAsFile() as File & { src: string };
        file.src = URL.createObjectURL(file);
        this.files.push(file);
      });
    }
  }

  onPaste(e: ClipboardEvent) {
    const clipboardData = e.clipboardData || (window as any).clipboardData;
    const items: DataTransferItem[] = Array.from(clipboardData.items);
    const images = items.filter(x => /image/i.test(x.type));
    if (images.length) {
      images.forEach((image) => {
        const file = image.getAsFile() as File & { src: string };
        file.src = URL.createObjectURL(file);
        this.files.push(file);
      });
    }
  }

  ngDoCheck() {
    this.message = this.message.trim();
  }

  triggerTypingEvent($event: any) {
    // if enter then ignore
    if ($event.keyCode === 13) return;
    this.chatService.triggerTypingEvent(this.id);
  }

  sendMessage(e?: any) {
    e?.preventDefault();
    if (this.message === "" && !this.files.length) return;
    const dto: SendMessageDto = {
      groupChatId: this.id,
      text: this.message,
      files: this.files,
    };
    if (!this.message)
      delete dto.text;
    this.chatService.sendMessage(dto);
    this.message = "";
    this.files = [];
    setTimeout(() => this.adjustHeight(e?.target));
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

  adjustHeight(el: any) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }
}
