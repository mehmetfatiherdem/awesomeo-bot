import 'dotenv/config';
import { Telegraf } from 'telegraf';

// Create your bot and tell it about your context type
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Hello there!'));

bot.hears('hi', (ctx) => ctx.reply('Hi'));

bot.hears('dice', (ctx) => {
  ctx.replyWithDice();
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
