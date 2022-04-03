import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import sequelize from "./db_connection";
import {
  Users as UsersModel,
  UserTunnels as UserTunnelsModel,
  Tunnels as TunnelsModel,
  Servers as ServersModel,
} from "./db_models";
import BotScripts from "./bot_scripts";

dotenv.config();

const bot = new TelegramBot(process.env.telegram_bot_api, { polling: true });

bot.setMyCommands([{ command: "/info", description: "Подробная информация" }]);

/**
 * @param runtime: message/callback (text),
 * @param command: command (text),
 * @param editField: server field (text),
 * @param messageID: bot last message id (id),
 */
const states = {};
const servers = [];
const tunnels = [];

const start = async () => {
  //!DEVONLY_COMMENTED
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (e) {
    console.error("Подключение к БД не выполнилось!\n", e);
  }

  bot.on("message", async (msg) => {
    const chatID = msg.from.id;

    // BaseCommands
    if (msg.text === "/start") {
      return BotScripts.Commands.start(bot, chatID, msg, UsersModel);
    }
    if (msg.text === "/info") {
      return BotScripts.Commands.info(bot, chatID, msg, UsersModel);
    }

    // HandleUserInputCommands
    if (states[chatID] && states[chatID].runtime == "message") {
      if (states[chatID].command == "addServer") {
        return BotScripts.Commands.addServer(
          bot,
          chatID,
          msg,
          states,
          servers,
          tunnels,
          ServersModel,
          TunnelsModel
        );
      }
    }

    // UndifinedCommands
    return bot.sendMessage(chatID, "Я вас не понимаю");
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data,
      chatID = msg.from.id,
      messageID = msg.message.message_id;

    // AdminActions
    if (data == "useEditMode") {
      return BotScripts.Callbacks.useEditMode(bot, chatID, messageID);
    }
    if (data == "sendGlobalMessage") {
      return BotScripts.Callbacks.sendGlobalMessage();
    }

    // AdminEditorMode
    if (data == "addServer") {
      return BotScripts.Callbacks.addServer(bot, chatID, messageID, states);
    }
    if (data == "editServer") {
      return BotScripts.Callbacks.editServer();
    }
    if (data == "removeServer") {
      return BotScripts.Callbacks.removeServer();
    }

    // EditServerInfo
    if (data == "backToAdminEditServer") {
      return BotScripts.Callbacks.backToAdminEditServer();
    }
    if (data == "editServerAllFields") {
      return BotScripts.Callbacks.editServerAllFields();
    }
    if (data == "editServerIP") {
      return BotScripts.Callbacks.editServerIP();
    }
    if (data == "editServerLeaseEndDate") {
      return BotScripts.Callbacks.editServerLeaseEndDate();
    }
    if (data == "editServerSSH_PASSWORD") {
      return BotScripts.Callbacks.editServerSSH_PASSWORD();
    }
    if (data == "editServerSSH_USER") {
      return BotScripts.Callbacks.editServerSSH_USER();
    }

    // OrderCart
    if (data == "backToShowServerList") {
      return BotScripts.Callbacks.backToShowServerList();
    }
    if (data == "orderAddServer") {
      return BotScripts.Callbacks.orderAddServer();
    }
    if (data == "orderRemoveServer") {
      return BotScripts.Callbacks.orderRemoveServer();
    }
    if (data == "orderShowPayMethods") {
      return BotScripts.Callbacks.orderShowPayMethods();
    }

    // OrderPay
    if (data == "orderCancel") {
      return BotScripts.Callbacks.orderCancel();
    }

    //orderPaymentMethod
    if (data == "backToAddOrderToCart") {
      return BotScripts.Callbacks.backToAddOrderToCart();
    }
    if (data == "orderCardPay") {
      return BotScripts.Callbacks.orderCardPay();
    }
    if (data == "orderQiwiPay") {
      return BotScripts.Callbacks.orderQiwiPay();
    }

    // UserGroupActions
    if (data == "showUserTunnels") {
      return BotScripts.Callbacks.showUserTunnels();
    }
    if (data == "showServers") {
      return BotScripts.Callbacks.showServers();
    }
    if (data == "showRef") {
      return BotScripts.Callbacks.showRef();
    }
  });
};

start();
