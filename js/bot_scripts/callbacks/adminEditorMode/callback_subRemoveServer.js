import BotOptions from "../../../bot_options";

export default async function (
  bot,
  chatID,
  messageID,
  states,
  data,
  localServers,
  localTunnels,
  ServersModel
) {
  try {
    const server = await ServersModel.findOne({ where: { id: data } });

    localServers.splice(
      localServers.findIndex((_server) => _server.IP == server.IP),
      1
    );

    localTunnels.splice(
      localTunnels.findIndex((_tunnel) => _tunnel.serverID == server.id),
      1
    );

    console.log(localServers);
    console.log(localTunnels);

    console.log(`SERVER_LOG:\n${server}`);
    await server.destroy();
    console.log(`SERVER_LOG:\n${server}`);

    bot.editMessageText("\u2705 Запись о сервере успешно удалена!", {
      chat_id: chatID,
      message_id: messageID,
    });

    states[chatID] = {};

    return bot.sendMessage(
      chatID,
      "Что вы хотите редактировать",
      BotOptions.adminActionEditServer
    );
  } catch (e) {
    const eMsg =
      await "\u274C Неудалось обратиться к БД для редактирования валютной пары!\n";
    await console.error(`${eMsg}\n${e}\n`);
    return bot.sendMessage(chatID, eMsg);
  }
}

//2705 - зеленая галочка