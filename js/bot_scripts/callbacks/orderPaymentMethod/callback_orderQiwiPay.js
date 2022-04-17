import BotOptions from "../../../bot_options";
import { CalculateEndOfLeaseDate } from "../../../services";
import { QiwiPayMerchant } from "../../../payment";
import { countryCodeEmoji } from "country-code-emoji";

export default async function (
  bot,
  chatID,
  messageID,
  states,
  billIDs,
  localTunnels
) {
  const tunnel = localTunnels.find(
    (tunnel) => tunnel.serverID == states[chatID].serverID
  );

  const orderPrice = tunnel.price * states[chatID].orderCount;

  const [billID, payUrl] = await QiwiPayMerchant(orderPrice);

  billIDs.push(billID);

  states[chatID] = {
    ...states[chatID],
    messageID: messageID,
    billID: billID,
    payUrl: payUrl,
  };

  bot.editMessageText(
    `\u{1F4B3} Оплата товара\n\n\u{1F4E1} Товар: ${countryCodeEmoji(
      tunnel.emojiCountry
    )} ${
      tunnel.serverName
    }\n\n\u{1F4B5}Сумма к оплате: ${orderPrice}₽\n\n\u{1F5D3} Подписка до ${CalculateEndOfLeaseDate(
      states[chatID].orderCount
    )} `,
    {
      chat_id: chatID,
      message_id: messageID,
      ...BotOptions.allActionPayOrder(payUrl, orderPrice),
    }
  );
}
