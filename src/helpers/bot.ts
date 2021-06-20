import * as TelegramBot from 'node-telegram-bot-api';
import constants from './constans';

let botInstance = null;

export function getBotInstance() {
  if (!botInstance) {
    botInstance = new TelegramBot(constants.botToken, { polling: true });
    return botInstance;
  }
  return botInstance;
}
