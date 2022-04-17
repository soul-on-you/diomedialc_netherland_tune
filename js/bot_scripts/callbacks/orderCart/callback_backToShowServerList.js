import BotOptions from "../../../bot_options";
import { InternetSpeed } from "../../../services";
import { countryCodeEmoji } from "country-code-emoji";

export default function (bot, chatID, messageID, states, localTunnels) {
  states[chatID] = {};

  const message_buttons = localTunnels.map((tunnel) => {
    return [
      {
        text: `${countryCodeEmoji(tunnel.emojiCountry)} ${
          tunnel.serverName
        } ${String.fromCharCode(55356)}${String.fromCharCode(
          57104
        )} ${InternetSpeed(tunnel.maxSpeed)} ${tunnel.price}₽`,
        callback_data: tunnel.serverID,
      },
    ];
  });

  const message_options_reply_markup = JSON.stringify({
    inline_keyboard: [
      ...message_buttons,
      ...JSON.parse(BotOptions.allBackToMain.reply_markup).inline_keyboard,
    ],
  });

  states[chatID] = {
    runtime: "callback",
    command: "orderCart",
    messageID: messageID,
  };

  bot.editMessageText("\u{1F4E1} Выберите сервер, который хотите арендовать:", {
    chat_id: chatID,
    message_id: messageID,
    reply_markup: message_options_reply_markup,
  });
}
