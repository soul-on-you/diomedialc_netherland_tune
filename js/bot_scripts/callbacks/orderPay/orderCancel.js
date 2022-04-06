import sendInfoMessage from "../../commands/base/command_info"
import { QiwiCloseOrder } from "../../../payment";

export default async function (bot, chatID, messageID, states, billIDs, first_name, UsersModel) {
  const billID = states[chatID].billID;

  QiwiCloseOrder(billID);

  billIDs.splice(billIDs.indexOf(billID), 1);

  states[chatID] = {};

  bot.editMessageText("\u267B Заказ удален", {
    chat_id: chatID,
    message_id: messageID,
  });

  await sendInfoMessage(bot, chatID, first_name, UsersModel);
  
}

//267B - recycling
