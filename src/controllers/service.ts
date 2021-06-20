import { getBotInstance } from '../helpers/bot';

const bot = getBotInstance();

function pinnedUsers(story) {
  const pinedUsers = [];
  if (story.tappable_objects.length <= 2) {
    story.tappable_objects.forEach((object) => {
      if (object.username) pinedUsers.push(`<a href="https://instagram.com/${object.username}">@${object.username}</a>`);
    });
  } else if (story.tappable_objects.length <= 8) {
    story.tappable_objects.forEach((object) => {
      if (object.username) pinedUsers.push(`@${object.username}`);
    });
  }
  return pinedUsers;
}
function prettyDateTime(milliseconds) {
  const prettyDate = [];
  const date = new Date(milliseconds);
  const day = date.getDate();
  if (day < 10) {
    prettyDate.push(`0${day}`);
  } else {
    prettyDate.push(day);
  }
  const month = date.getMonth() + 1;
  if (month < 10) {
    prettyDate.push(`0${month}`);
  } else {
    prettyDate.push(month);
  }
  const year = date.getFullYear().toString().split('').splice(0, 2);
  prettyDate.push(year.join(''));
  return prettyDate.join('.');
}

function dateTime(milliseconds) {
  const date = new Date(milliseconds);
  const prettyDate = prettyDateTime(milliseconds);
  return `${prettyDate} ${date.getHours()}:${date.getMinutes()}`;
}

export function sortStories(stories) {
  const data = [];
  for (const story of stories) {
    if (story.is_video) {
      const pined = pinnedUsers(story);
      const length = story.video_resources.length - 1;
      data.push({
        video: true,
        content: story.video_resources[length].src,
        info: {
          parse_mode: 'HTML',
          caption: `📅 ${dateTime(story.taken_at_timestamp * 1000)} \n\n ${pined.join('\n')}`,
        },
      });
    } else {
      const pined = pinnedUsers(story);
      data.push({
        video: false,
        content: story.display_url,
        info: {
          parse_mode: 'HTML',
          caption: `📅 ${dateTime(story.taken_at_timestamp * 1000)} \n\n ${pined.join('\n')}`,
        },
      });
    }
  }
  return data;
}

export async function drawStories(sortedStories, chatId) {
  sortedStories.map(async (story) => {
    if (story.video === true) {
      await bot.sendVideo(chatId, story.content, story.info);
    } else {
      await bot.sendPhoto(chatId, story.content, story.info);
    }
  });
}
