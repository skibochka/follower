import * as Instagram from 'instagram-web-api';
import constants from '../helpers/constans';
import { getInstagramInstance } from '../helpers/instagram';
import { getBotInstance } from '../helpers/bot';
import { drawStories, sortStories } from './service';

export default class Client {
  constructor(bot, client) {
    this.client = client;

    this.bot = bot;
    this.bot.onText(/\/check/, () => this.check());
  }

  public client: Instagram

  public bot: any

  static async build() {
    const client = await getInstagramInstance();
    const bot = await getBotInstance();
    return new this(bot, client);
  }

  async check() {
    const stories = await this.client.getStoryItemsByUsername({ username: constants.nickname });

    if (stories.length === 0) return;
    const sortedStories = sortStories(stories);
    await drawStories(sortedStories, constants.sendTo);
  }
}
