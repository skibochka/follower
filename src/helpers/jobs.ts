import * as cron from 'node-cron';
import { getInstagramInstance } from './instagram';
import constants from './constans';
import { sortStories, drawStories } from '../controllers/service';

const ids = [];

cron.schedule('*/5 * * * *', async () => {
  const instagram = await getInstagramInstance();
  const stories = await instagram.getStoryItemsByUsername({ username: constants.nickname });

  if (stories.length === 0) return;
  const newStories = stories.filter((story) => {
    if (!ids.includes(story.id)) {
      ids.push(story.id);
      return story;
    }
    return null;
  });

  const sortedStories = sortStories(newStories);
  await drawStories(sortedStories, constants.sendTo);
});
