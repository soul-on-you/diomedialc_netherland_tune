import BotOptions from "../../../bot_options";

export default async function (
  bot,
  chatID,
  textMessage,
  states,
  first_name,
  UsersModel
) {
  const usersID = (await UsersModel.findAll()).map((user) => user.chatID);

  for (const _chatID of usersID) {
    bot.sendMessage(_chatID, textMessage);
  }

  //   bot.editMessageText(`Приветствую, ${first_name}!\nВыберите действие:`, {
  //     chat_id: chatID,
  //     message_id: states[chatID].messageID,
  //     ...BotOptions.adminActions,
  //   });

  bot.deleteMessage(chatID, states[chatID].messageID);

  bot.sendMessage(
    chatID,
    `Приветствую, ${first_name}!\nВыберите действие:`,
    BotOptions.adminActions
  );

  states[chatID] = {};
}
