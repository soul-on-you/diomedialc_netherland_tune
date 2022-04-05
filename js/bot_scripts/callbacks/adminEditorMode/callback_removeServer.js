import BotOptions from "../../../bot_options";

export default async function (bot, chatID, messageID, states, localTunnels) {
  states[chatID] = {
    runtime: "callback",
    command: "removeServer",
  };

  const tunnelsButtons = localTunnels.map((tunnel) => [
    { text: tunnel.serverName, callback_data: tunnel.serverID },
  ]);

  const tunnelsOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        ...tunnelsButtons,
        ...JSON.parse(BotOptions.adminBackToEditServer.reply_markup)
          .inline_keyboard,
      ],
    }),
  };

  console.log(tunnelsButtons);
  console.log(tunnelsOptions);

  // console.log(localTunnels);
  // const BotOptions = {  adminBackToEditServer: {
  //   reply_markup: JSON.stringify({
  //     inline_keyboard: [
  //       [{ text: "Назад \u25BC", callback_data: "backToAdminEditServer" }],
  //     ],
  //   }),
  // },}
  // console.log(...JSON.parse( BotOptions.adminBackToEditServer.reply_markup).inline_keyboard);

  return bot.editMessageText("Выберите сервер, который хотите удалить", {
    chat_id: chatID,
    message_id: messageID,
    ...tunnelsOptions,
  });
}
