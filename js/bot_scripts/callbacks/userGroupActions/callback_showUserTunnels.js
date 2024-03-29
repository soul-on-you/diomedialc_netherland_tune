import BotOptions from "../../../bot_options";
import { countryCodeEmoji } from "country-code-emoji";

export default async function (
  bot,
  chatID,
  messageID,
  states,
  localTunnels,
  UserTunnelsModel
) {
  const tunnels = await UserTunnelsModel.findAll({ where: { chatID } });

  tunnels.sort(function (serverA, serverB) {
    if (serverA.status != false) {
      return 1;
    }

    if (serverB.status != false) {
      return -1;
    }

    return 0;
  });

  const userTunnelsButtons = tunnels.map((tunnel) => {
    const tunnelData = localTunnels.find(
      (_tunnel) => _tunnel.serverID == tunnel.serverID
    );
    return [
      {
        text: `${countryCodeEmoji(tunnelData.emojiCountry)} ${tunnelData.serverName}`,
        callback_data: `${tunnel.serverID}:${tunnel.status}`,
      },
    ];
  });

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
