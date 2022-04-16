import BotOptions from "../../../bot_options";

export default function (bot, chatID, messageID, states) {
  states[chatID] = {
    runtime: "message",
    command: "getUserTunnelPassword",
    messageID: messageID,
    serverID: states[chatID].serverID,
  };

  bot.editMessageText("\u26A0 Придумайте пороль для VPN соединения:", {
    chat_id: chatID,
    message_id: messageID,
    ...BotOptions.allBackToCallback("showUserTunnels", states[chatID]),
  });
}
