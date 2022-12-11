export interface SendMessageDto {
    groupChatId: string;
    text: string;
    attachments?: string[];
}