import { nanoid, customAlphabet } from "nanoid";
import { initTunnel } from "../../../tunnels_provider";
import { join } from "path";
import showInfo from "../../commands/base/command_info";

export default async function (
  bot,
  chatID,
  messageID,
  states,
  UserTunnelsModel,
  ServersModel,
  first_name,
  UsersModel
) {
  const tunnel = await UserTunnelsModel.findOne({
    where: { chatID, serverID: states[chatID].serverID },
  });
  const startTokenCharset =
    "01234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const secureNanoid = customAlphabet(startTokenCharset, 1);

  const client = `${secureNanoid()}${nanoid(39)}`;

  tunnel.status = true;
  tunnel.client = client;
  tunnel.password = states[chatID].textPassword;

  await tunnel.save();

  console.log(tunnel);
  bot.editMessageText(`\u{1F4E9} Регистртация клиента...`, {
    chat_id: chatID,
    message_id: messageID,
  });

  const server = await ServersModel.findOne({
    where: { id: states[chatID].serverID },
  });

  await initTunnel(
    server.IP,
    server.SSH_PASSWORD,
    client,
    states[chatID].textPassword
  );

  bot.deleteMessage(chatID, messageID);

  await bot.sendDocument(
    chatID,
    join(
      __dirname,
      "../../../..",
      `${process.env.clients_base_dir}${client}.ovpn`
    ),
    { caption: `\u{1F4BE} Файл конфигурации тунеля для openvpn...` }
  );

  return showInfo(bot, chatID, first_name, UsersModel);
}
