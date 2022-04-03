import BotOptions from "../../../bot_options";
import { UserRulesResolver } from "../../../services";

export default async function (bot, chatID, msg, UsersModel) {
  try {
    // const user = await UsersModel.findOne({ where: { chatID: chatID } });
    // let options;
    // switch (user.rules) {
    //   case "ADMIN":
    //     options = BotOptions.adminActions;
    //     break;
    //   case "MODERATOR":
    //     options = BotOptions.moderatorActions;
    //     break;
    //   case "USER":
    //     options = BotOptions.userActions;
    //     break;
    // }

    const options = await UserRulesResolver(
      UsersModel,
      chatID,
      BotOptions.adminActions,
      BotOptions.moderatorActions,
      BotOptions.userActions
    );
    return bot.sendMessage(
      chatID,
      `Приветствую, ${msg.from.first_name}!\nВыберите действие:`,
      options
    );
  } catch (e) {
    const eMsg =
      "Системная ошибка. Подключение к БД не выполнилось!\nПовторите свои действия позже\n";
    console.error(`${eMsg}\n${e}\n`);
    return bot.sendMessage(chatID, eMsg);
  }
}
