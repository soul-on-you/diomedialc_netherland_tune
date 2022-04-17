import BotOptions from "../../../bot_options";
import { countryCodeEmoji } from "country-code-emoji";

export default async function (
  bot,
  chatID,
  messageID,
  data,
  states,
  localTunnels,
  UserTunnelsModel
) {
  const [serverID, status] = data.split(":");

  if (status == "false") {
    states[chatID] = {
      runtime: "message",
      command: "getUserTunnelPassword",
      messageID: messageID,
      serverID: serverID,
    };

    bot.editMessageText("\u26A0 Придумайте пороль для VPN соединения:", {
      chat_id: chatID,
      message_id: messageID,
      ...BotOptions.allBackToCallback("showUserTunnels", states[chatID]),
    });

    return;
  }

  const tunnelFromDB = await UserTunnelsModel.findOne({
    where: { chatID, serverID },
  });
  const tunnel = localTunnels.find((tunnel) => tunnel.serverID == serverID);

  states[chatID] = {
    serverID: serverID,
  };

  return bot.editMessageText(
    `\u{1F4E1} Сервер: ${countryCodeEmoji(tunnel.emojiCountry)} ${
      tunnel.serverName
    }\n\n\u{1F5D3}Подписка действительна до ${new Date(
      tunnelFromDB.tunnelSubscriptionsTerm
    ).toLocaleDateString()}\n\n\u{1F4B5} Стоимость: ${tunnel.price}₽/месяц`,
    {
      chat_id: chatID,
      message_id: messageID,
      ...BotOptions.allUserTunnelInfo,
    }
  );

  //   bot.editMessageText(
  //     `\u{1F4B3} Оплата товара\n\n\u{1F4E1} Товар: ${
  //       tunnel.serverName
  //     }\n\n\u{1F4B5}Сумма к оплате: ${orderPrice}₽\n\n\u{1F5D3} Подписка до ${CalculateEndOfLeaseDate(
  //       states[chatID].orderCount
  //     )} `,
  //     {
  //       chat_id: chatID,
  //       message_id: messageID,
  //       ...BotOptions.allActionPayOrder(payUrl, orderPrice),
  //     }
  //   );
}

//1F4B3 credit card
//1F4E1 antena
//1F4B5 dollar banknote
//1F5D3 spiral calendar
//26A0 - warning
