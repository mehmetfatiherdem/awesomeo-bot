import 'dotenv/config';
import { Telegraf } from 'telegraf';
import express from 'express';
const app = express();

const port = process.env.PORT || 3000;

// Create your bot and tell it about your context type
const bot = new Telegraf(process.env.BOT_TOKEN);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

bot.hears('cmd', (ctx) => {
  ctx.reply('hi\ndice\n');
});

bot.start((ctx) => ctx.reply('Hello there!'));

bot.hears('hi', (ctx) => ctx.reply('Hi'));

bot.hears('dice', (ctx) => {
  ctx.replyWithDice();
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
