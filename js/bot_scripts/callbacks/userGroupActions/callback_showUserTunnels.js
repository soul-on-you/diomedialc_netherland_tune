import BotOptions from "../../../bot_options";

export default async function (
  bot,
  chatID,
  messageID,
  states,
  localTunnels,
  UserTunnelsModel
) {
  const tunnels = await UserTunnelsModel.findAll();

  tunnels.sort(function (serverA, serverB) {
    if (serverB.status != false) {
      return 1;
    }

    if (serverA.status != false) {
      return -1;
    }

    return 0;
  });

  const userTunnelsButtons = tunnels.map((tunnel) => [
    {
      text: localTunnels.find((_tunnel) => _tunnel.serverID == tunnel.serverID)
        .serverName,
      callback_data: `${tunnel.serverID}:${tunnel.status}`,
    },
  ]);

  const userTunnelsOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        ...userTunnelsButtons,
        ...JSON.parse(BotOptions.allBackToMain.reply_markup).inline_keyboard,
      ],
    }),
  };

  states[chatID] = {
    runtime: "callback",
    command: "showUserTunnelInfo",
  };

  return bot.editMessageText(
    "Выберите сервер, чтобы посмотреть детальную информацию",
    {
      chat_id: chatID,
      message_id: messageID,
      ...userTunnelsOptions,
    }
  );
}
