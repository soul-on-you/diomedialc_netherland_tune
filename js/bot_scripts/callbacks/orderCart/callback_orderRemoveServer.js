import BotOptions from "../../../bot_options";
import { InternetSpeed } from "../../../services";

export default function (bot, chatID, messageID, states, localTunnels) {
  if (states[chatID].orderCount > 1) {
    const tunnel = localTunnels.find(
      (tunnel) => tunnel.serverID == states[chatID].serverID
    );

    states[chatID].orderCount -= 1;

    bot.editMessageText(
      `\u{1F4E1} Сервер ${tunnel.serverName}\n\n\u{1F4B5} Цена: ${
        tunnel.price
      }₽/месяц\n\n\u23F1 Скорость: ${InternetSpeed(tunnel.maxSpeed)}`,
      {
        chat_id: chatID,
        message_id: messageID,
        ...BotOptions.allActionAddOrderToCart(
          states[chatID].orderCount,
          states[chatID].orderCount * tunnel.price
        ),
      }
    );
  }
}

//1F4E1 antena
//1F4B5 dollar banknote
//23F1 - stopwatch
