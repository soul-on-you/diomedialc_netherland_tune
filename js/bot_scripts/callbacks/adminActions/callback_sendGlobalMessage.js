import BotOptions from "../../../bot_options";

export default function (bot, chatID, messageID, states) {
  states[chatID] = {
    runtime: "message",
    command: "sendGlobalMessage",
    messageID: messageID,
  };

  return bot.editMessageText("Введите текст сообщения:", {
    chat_id: chatID,
    message_id: messageID,
    ...BotOptions.adminBackToEditServer,
  });
}
