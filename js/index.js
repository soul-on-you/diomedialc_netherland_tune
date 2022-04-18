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
import BotPreInit from "./bot_init";
import { QiwiServiceWorker } from "./payment";

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

/**
 * @field IP: {String}
 * @field SSH_USER: {String}
 * @field SSH_PASSWORD: {String}
 * @field LeaseEndDate: {DATE}
 */
const servers = [];

/**
 * @field serverID: {INTEGER}
 * @field serverName: {String}
 * @field emojiCountry: {String}
 * @field price: {INTEGER}
 * @field maxSpeed: {INTEGER}
 */
const tunnels = [];

/**
 * @field billID: {String}
 */
const qiwiBillIDs = [];

// const asyncInitLocalObjects = async() =>{
//   BotPreInit.syncObjectWithDB()
// }

//!TestRun
// bot.on("message", async (msg) => {
//   const chatID = msg.from.id;
//   return bot.sendMessage(chatID, "Я вас не понимаю");
// });

const start = async () => {
  //!DEVONLY_COMMENTED
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (e) {
    console.error("Подключение к БД не выполнилось!\n", e);
  }

  //!PREINIT
  await BotPreInit.syncObjectWithDB(
    tunnels,
    TunnelsModel,
    "serverID",
    "serverName",
    "emojiCountry",
    "price",
    "maxSpeed"
  );

  await BotPreInit.syncObjectWithDB(
    servers,
    ServersModel,
    "IP",
    "SSH_USER",
    "SSH_PASSWORD",
    "LeaseEndDate"
  );

  console.log("OK!");

  QiwiServiceWorker(qiwiBillIDs, bot, states, UserTunnelsModel);

  bot.on("message", async (msg) => {
    const chatID = msg.from.id;

    // BaseCommands
    if (msg.text === "/start") {
      return BotScripts.Commands.start(bot, chatID, msg, UsersModel);
    }
    if (msg.text === "/info") {
      return BotScripts.Commands.info(
        bot,
        chatID,
        msg.from.first_name,
        UsersModel
      );
    }

    // HandleUserInputCommands
    if (states[chatID] && states[chatID].runtime == "message") {
      // adminActions
      if (states[chatID].command == "sendGlobalMessage") {
        return BotScripts.Commands.sendGlobalMessage(
          bot,
          chatID,
          msg.text,
          states,
          msg.from.first_name,
          UsersModel
        );
      }

      // AdminEditorMode
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

      // UserGroupActions
      if (states[chatID].command == "getUserTunnelPassword") {
        return BotScripts.Commands.getUserTunnelPassword(
          bot,
          chatID,
          states,
          msg.text
        );
      }
    }

    //!DEBUG ONLY
    console.log(states);

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
      return BotScripts.Callbacks.sendGlobalMessage(
        bot,
        chatID,
        messageID,
        states
      );
    }

    // AdminEditorMode
    if (data == "addServer") {
      return BotScripts.Callbacks.addServer(bot, chatID, messageID, states);
    }
    if (data == "editServer") {
      return BotScripts.Callbacks.editServer();
    }
    if (data == "removeServer") {
      return BotScripts.Callbacks.removeServer(
        bot,
        chatID,
        messageID,
        states,
        tunnels
      );
    }

    // EditServerInfo
    if (data == "backToAdminEditServer") {
      return BotScripts.Callbacks.backToAdminEditServer(
        bot,
        chatID,
        messageID,
        states
      );
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
    //? if (data == "backToShowServerList") {
    //?   return BotScripts.Callbacks.backToShowServerList();
    //? }
    if (data == "orderAddServer") {
      return BotScripts.Callbacks.orderAddServer(
        bot,
        chatID,
        messageID,
        states,
        tunnels
      );
    }
    if (data == "orderRemoveServer") {
      return BotScripts.Callbacks.orderRemoveServer(
        bot,
        chatID,
        messageID,
        states,
        tunnels
      );
    }
    if (data == "orderShowPayMethods") {
      return BotScripts.Callbacks.orderShowPayMethods(
        bot,
        chatID,
        messageID,
        states,
        tunnels
      );
    }

    // OrderPay
    if (data == "orderCancel") {
      return BotScripts.Callbacks.orderCancel(
        bot,
        chatID,
        messageID,
        states,
        qiwiBillIDs,
        msg.from.first_name,
        UsersModel
      );
    }

    // OrderPaymentMethod
    if (data == "backToAddOrderToCart") {
      return BotScripts.Callbacks.backToAddOrderToCart(
        bot,
        chatID,
        messageID,
        states,
        tunnels
      );
    }
    if (data == "orderCardPay") {
      return BotScripts.Callbacks.orderCardPay(
        bot,
        chatID,
        messageID,
        states,
        qiwiBillIDs,
        tunnels
      );
    }
    if (data == "orderQiwiPay") {
      return BotScripts.Callbacks.orderQiwiPay(
        bot,
        chatID,
        messageID,
        states,
        qiwiBillIDs,
        tunnels
      );
    }

    // UserGroupActions
    if (data == "backToShowActions") {
      return BotScripts.Callbacks.backToShowActions(
        bot,
        chatID,
        messageID,
        states,
        msg.from.first_name,
        UsersModel
      );
    }
    if (data == "showRef") {
      return BotScripts.Callbacks.showRef();
    }
    if (data == "showServers") {
      return BotScripts.Callbacks.showServers(
        bot,
        chatID,
        messageID,
        states,
        tunnels
      );
    }
    if (data == "showUserTunnels") {
      return BotScripts.Callbacks.showUserTunnels(
        bot,
        chatID,
        messageID,
        states,
        tunnels,
        UserTunnelsModel
      );
    }

    // UserTunnels
    if (data == "confirmUserTunnelPassword") {
      return BotScripts.Callbacks.confirmUserTunnelPassword(
        bot,
        chatID,
        messageID,
        states,
        UserTunnelsModel,
        ServersModel,
        msg.from.first_name,
        UsersModel
      );
    }
    if (data == "getUserTunnelOVPN") {
      return BotScripts.Callbacks.getUserTunnelOVPN(
        bot,
        chatID,
        messageID,
        states,
        tunnels,
        UserTunnelsModel
      );
    }
    if (data == "newUserTunnelPassword") {
      return BotScripts.Callbacks.newUserTunnelPassword(
        bot,
        chatID,
        messageID,
        states
      );
    }
    if (data == "showUserTunnelsPassword") {
      return BotScripts.Callbacks.showUserTunnelsPassword(
        bot,
        chatID,
        messageID,
        states,
        tunnels,
        UserTunnelsModel
      );
    }

    // HandleSubCallback
    if (states[chatID] && states[chatID].runtime == "callback") {
      // AdminEditorMode
      if (states[chatID].command == "removeServer") {
        return BotScripts.Callbacks.subRemoveServer(
          bot,
          chatID,
          messageID,
          states,
          data,
          servers,
          tunnels,
          ServersModel
        );
      }

      // orderCart
      if (states[chatID].command == "orderCart") {
        return BotScripts.Callbacks.subOrderCart(
          bot,
          chatID,
          messageID,
          data,
          states,
          tunnels
        );
      }

      // userGroupActions
      if (states[chatID].command == "showUserTunnelInfo") {
        return BotScripts.Callbacks.subShowUserTunnelInfo(
          bot,
          chatID,
          messageID,
          data,
          states,
          tunnels,
          UserTunnelsModel
        );
      }
    }
  });
};

start();
