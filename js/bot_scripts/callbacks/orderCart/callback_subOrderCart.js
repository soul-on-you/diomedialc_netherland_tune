import BotOptions from "../../../bot_options";
import { InternetSpeed } from "../../../services";

export default function (bot, chatID, messageID, data, states, localTunnels) {
  const tunnel = localTunnels.find((tunnel) => tunnel.serverID == data);

  states[chatID] = {
    serverID: tunnel.serverID,
    orderCount: 1,
  };

  bot.editMessageText(
    `\u{1F4E1} Сервер ${tunnel.serverName}\n\n\u{1F4B5} Цена: ${
      tunnel.price
    }₽/месяц\n\n\u23F1 Скорость: ${InternetSpeed(tunnel.maxSpeed)}`,
    {
      chat_id: chatID,
      message_id: messageID,
      ...BotOptions.allActionAddOrderToCart(1, tunnel.price),
    }
  );
}

//1F4E1 antena
//1F4B5 dollar banknote
//23F1 - stopwatch
