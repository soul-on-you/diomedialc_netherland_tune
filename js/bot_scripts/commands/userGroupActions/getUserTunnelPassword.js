import BotOptions from "../../../bot_options";

export default async function (
  bot,
  chatID,
  states,
  textPassword
  //   UserTunnelsModel
) {
  //   console.log("getUserTunnelPassword");

  bot.editMessageText(`Введенный пороль: ${textPassword}`, {
    chat_id: chatID,
    message_id: states[chatID].messageID,
    ...BotOptions.allUserGetPassword,
  });

  states[chatID] = { serverID: states[chatID].serverID, textPassword };
}
