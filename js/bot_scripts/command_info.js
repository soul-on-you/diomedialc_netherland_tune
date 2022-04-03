import BotOptions from "../bot_options";
// BotOprions.adminActions
// {
//   adminActions,
//   moderatorActions,
//   userActions,
// }

export default async function (chatID, UsersModel, bot, msg) {
  try {
    const user = await UsersModel.findOne({ where: { chatID: chatID } });
    let options;
    switch (user.rules) {
      case "ADMIN":
        options = BotOptions.adminActions;
        break;
      case "MODERATOR":
        options = BotOptions.moderatorActions;
        break;
      case "USER":
        options = BotOptions.userActions;
        break;
    }
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
