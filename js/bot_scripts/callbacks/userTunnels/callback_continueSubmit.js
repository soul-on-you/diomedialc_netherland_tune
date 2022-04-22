import BotOptions from "../../../bot_options";
import { join } from "path";
import { countryCodeEmoji } from "country-code-emoji";

export default async function (
  bot,
  chatID,
  messageID,
  states,
  localTunnels,
  UserTunnelsModel
) {
  bot.sendMessage(
    chatID,
    "\u26A0 Эта функция пока недоступна, предлагаем вам оформить новую подписку"
  );

  // const tunnelFromDB = await UserTunnelsModel.findOne({
  //   where: { chatID, serverID: states[chatID].serverID },
  // });

  // const tunnel = localTunnels.find(
  //   (tunnel) => tunnel.serverID == states[chatID].serverID
  // );\u26A0

  // bot.deleteMessage(chatID, messageID);

  // await bot.sendDocument(
  //   chatID,
  //   join(
  //     __dirname,
  //     "../../../..",
  //     `${process.env.clients_base_dir}${tunnelFromDB.client}.ovpn`
  //   ),
  //   { caption: `\u{1F4BE} Файл конфигурации тунеля для openvpn...` }
  // );

  // return bot.sendMessage(
  //   chatID,
  //   `\u{1F4E1} Сервер:${countryCodeEmoji(tunnel.emojiCountry)} ${
  //     tunnel.serverName
  //   }\n\n\u{1F5D3}Подписка действительна до ${new Date(
  //     tunnelFromDB.tunnelSubscriptionsTerm
  //   ).toLocaleDateString()}\n\n\u{1F4B5} Стоимость: ${tunnel.price}₽/месяц`,
  //   BotOptions.allUserTunnelInfo
  // );
}

//1F5C4 - file cabinets
//1F4B3 credit card
//1F4E1 antena
//1F4B5 dollar banknote
//1F5D3 spiral calendar
