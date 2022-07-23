import 'dotenv/config';
import { Telegraf } from 'telegraf';
import Parser from 'rss-parser';
import express from 'express';
import { CronJob } from 'cron';
const app = express();

const parser = new Parser();

const port = process.env.PORT || 3000;

// Create your bot and tell it about your context type
const bot = new Telegraf(process.env.BOT_TOKEN);

// */10 * * * *

const job = new CronJob(
  '* * * * *',
  function () {
    bot.hears('son', async (ctx) => {
      const feed = await parser.parseURL(
        'https://www.ntv.com.tr/son-dakika.rss'
      );

      feed.items.forEach((item) => {
        if (new Date(item.isoDate).getTime() > Date.now() - 5 * 60 * 1000)
          ctx.reply(item.title + ':' + item.link);
      });
    });
  },
  null,
  true,
  'Europe/Istanbul'
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  job.start();
  console.log(`Listening on port ${port}`);
});

bot.start((ctx) => ctx.reply('Hello there!'));

bot.hears('hi', (ctx) => ctx.reply('Hi'));

bot.hears('dice', (ctx) => {
  ctx.replyWithDice();
});

bot.hears('eco', async (ctx) => {
  const feed = await parser.parseURL('https://www.ntv.com.tr/ekonomi.rss');

  feed.items.forEach((item) => {
    if (new Date(item.isoDate).getTime() > Date.now() - 24 * 60 * 60 * 1000)
      ctx.reply(item.title + ':' + item.link);
  });
});

bot.hears('money', async (ctx) => {
  const feed = await parser.parseURL('https://www.ntv.com.tr/ntvpara.rss');

  feed.items.forEach((item) => {
    if (new Date(item.isoDate).getTime() > Date.now() - 24 * 60 * 60 * 1000)
      ctx.reply(item.title + ':' + item.link);
  });
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
