import BotOptions from "../../../bot_options";
import { UserRulesResolver } from "../../../services";

export default async function (bot, chatID, messageID, first_name, UsersModel) {
  try {
    const options = await UserRulesResolver(
      UsersModel,
      chatID,
      BotOptions.adminActions,
      BotOptions.moderatorActions,
      BotOptions.userActions
    );

    return bot.editMessageText(
      `Приветствую, ${first_name}!\nВыберите действие:`,
      {
        chat_id: chatID,
        message_id: messageID,
        ...options,
      }
    );
  } catch (e) {
    const eMsg =
      "Системная ошибка. Подключение к БД не выполнилось!\nПовторите свои действия позже\n";
    console.error(`${eMsg}\n${e}\n`);
    return bot.sendMessage(chatID, eMsg);
  }
}

// return bot.sendMessage(
//   chatID,
//   `Приветствую, ${first_name}!\nВыберите действие:`,
//   options
// );
