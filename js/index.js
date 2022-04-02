import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import sequelize from "./db_connection";
import { Users as UsersModel } from "./db_models";
import BotCommands from "./bot_scripts";

dotenv.config();
console.log(process.env.telegram_bot_api);

const bot = new TelegramBot(process.env.telegram_bot_api, { polling: true });

bot.setMyCommands([{ command: "/info", description: "Подробная информация" }]);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (e) {
    console.error("Подключение к БД не выполнилось!\n", e);
  }

  bot.on("message", async (msg) => {
    const chatID = await msg.from.id;

    if (msg.text === "/start") {
      BotCommands.start(chatID, UsersModel, bot, msg);
    }
  });
};

start();
