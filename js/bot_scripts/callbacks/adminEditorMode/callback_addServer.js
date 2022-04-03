import BotOptions from "../../../bot_options";

export default function (bot, chatID, messageID, states) {
  console.log(chatID, states);
  states[chatID] = {
    runtime: "message",
    command: "addServer",
    messageID: messageID,
  };
  console.log(chatID, states);
  return bot.editMessageText(
    "Введите {ip:user:pass:end_date(yyyy-mm-dd):servername:emojiCode:price:maxspeed}",
    {
      chat_id: chatID,
      message_id: messageID,
      ...BotOptions.adminBackToEditServer,
    }
  );
}
