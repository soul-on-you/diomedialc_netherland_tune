import BotOptions from "../../../bot_options";
import { UserRulesResolver } from "../../../services";

export default async function (bot, chatID, first_name, UsersModel) {
  try {
    const options = await UserRulesResolver(
      UsersModel,
      chatID,
      BotOptions.adminActions,
      BotOptions.moderatorActions,
      BotOptions.userActions
    );
    return bot.sendMessage(
      chatID,
      `Приветствую, ${first_name}!\nВыберите действие:`,
      options
    );
  } catch (e) {
    const eMsg =
      "Системная ошибка. Подключение к БД не выполнилось!\nПовторите свои действия позже\n";
    console.error(`${eMsg}\n${e}\n`);
    return bot.sendMessage(chatID, eMsg);
  }
}

// import { botSendInfoMessage } from "../../../message_scripts";

// export default async function (bot, chatID, first_name, UsersModel) {
//   await botSendInfoMessage(bot, chatID, first_name, UsersModel);
// }
