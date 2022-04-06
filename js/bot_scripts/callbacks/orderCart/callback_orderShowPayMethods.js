import BotOptions from "../../../bot_options";
import { CalculateEndOfLeaseDate } from "../../../services";

export default function (bot, chatID, messageID, states, localTunnels) {
  const tunnel = localTunnels.find(
    (tunnel) => tunnel.serverID == states[chatID].serverID
  );
  console.log(states);

  bot.editMessageText(
    `\u{1F4B3} Способ оплаты\n\n\u{1F4E1} Товар: ${
      tunnel.serverName
    }\n\n\u{1F4B5}Сумма к оплате: ${
      tunnel.price * states[chatID].orderCount
    }₽\n\n\u{1F5D3} Подписка до ${CalculateEndOfLeaseDate(
      states[chatID].orderCount
    )} `,
    {
      chat_id: chatID,
      message_id: messageID,
      ...BotOptions.allActionChoosePayMethod,
    }
  );
}

//1F4B3 credit card
//1F4E1 antena
//1F4B5 dollar banknote
//1F5D3 spiral calendar
