import BotOptions from "../../../bot_options";

export default function (bot, chatID, messageID, states) {
  states[chatID] = {};

  return bot.editMessageText("Что вы хотите редактировать", {
    chat_id: chatID,
    message_id: messageID,
    ...BotOptions.adminActionEditServer,
  });
}
