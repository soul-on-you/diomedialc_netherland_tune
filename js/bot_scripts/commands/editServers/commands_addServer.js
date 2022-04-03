import BotOptions from "../../../bot_options";

export default async function (
  bot,
  chatID,
  msg,
  states,
  localServers,
  localTunnels,
  ServersModel,
  TunnelsModel
) {
  const [
    ip,
    user,
    password,
    endDate,
    serverName,
    emojiCountryCode,
    price,
    maxSpeed,
  ] = msg.text.split(":");

  try {
    await ServersModel.create({
      IP: ip,
      SSH_USER: user,
      SSH_PASSWORD: password,
      LeaseEndDate: endDate,
    });
  } catch (e) {
    if (e.name != "SequelizeUniqueConstraintError") {
      const eMsg =
        await "Неудалось создать запись нового сервера в БД!Подключение к БД не выполнилось!\n";
      await console.error(`${eMsg}\n${e}\n`);
      return bot.sendMessage(chatID, eMsg);
    }
  }

  try {
    await TunnelsModel.create({
      name: serverName,
      emojiCountryCode: emojiCountryCode,
      price: price,
      connectionsSpeed: maxSpeed,
    });
  } catch (e) {
    if (e.name != "SequelizeUniqueConstraintError") {
      const eMsg =
        await "Неудалось создать запись нового сервера в БД!Подключение к БД не выполнилось!\n";
      await console.error(`${eMsg}\n${e}\n`);
      return bot.sendMessage(chatID, eMsg);
    }
  }

  // const ip=1, user="ee", password="1234", endDate = 22;
  // const newserver = {ip, user, password, endDate};
  // console.log(newserver);
  // const localServers = [newserver];
  // console.log(localServers);
  // localServers.push({ip, user, password, endDate});
  // console.log(localServers);

  localServers.push({ ip, user, password, endDate });
  localTunnels.push({ serverName, emojiCountryCode, price, maxSpeed });

  bot.editMessageText("\u2705 Новая запись о сервере успешно добавлена!", {
    chat_id: chatID,
    message_id: states[chatID].messageID,
  });

  states[chatID] = {};

  return bot.sendMessage(
    chatID,
    "Что вы хотите редактировать",
    BotOptions.adminActionEditServer
  );
}
