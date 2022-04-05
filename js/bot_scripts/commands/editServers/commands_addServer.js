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
    IP,
    SSH_USER,
    SSH_PASSWORD,
    LeaseEndDate,
    serverName,
    emojiCountryCode,
    price,
    maxSpeed,
  ] = msg.text.split(":");

  try {
    await ServersModel.create({
      IP,
      SSH_USER,
      SSH_PASSWORD,
      LeaseEndDate,
    });
  } catch (e) {
    if (e.name != "SequelizeUniqueConstraintError") {
      const eMsg =
        await "Неудалось создать запись нового сервера в БД!Подключение к БД не выполнилось!\n";
      await console.error(`${eMsg}\n${e}\n`);
      return bot.sendMessage(chatID, eMsg);
    }
  }

  let serverID;
  try {
    serverID = (await ServersModel.findOne({ where: { IP } })).id;

    await TunnelsModel.create({
      serverID,
      serverName,
      emojiCountryCode,
      price,
      maxSpeed,
    });
  } catch (e) {
    if (e.name != "SequelizeUniqueConstraintError") {
      const eMsg =
        "Неудалось создать запись нового сервера в БД!Подключение к БД не выполнилось!\n";
      console.error(`${eMsg}\n${e}\n`);
      return bot.sendMessage(chatID, eMsg);
    }
  }

  localServers.push({ IP, SSH_USER, SSH_PASSWORD, LeaseEndDate });
  localTunnels.push({
    serverID,
    serverName,
    emojiCountryCode,
    price,
    maxSpeed,
  });

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
