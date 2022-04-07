import { CalculateEndOfLeaseDateForDB } from "../services";

export default async function (bot, chatID, states, UserTunnelsModel) {
  try {
    await UserTunnelsModel.create({
      chatID: chatID,
      serverID: states[chatID].serverID,
      tunnelSubscriptionsTerm: CalculateEndOfLeaseDateForDB(
        states[chatID].orderCount
      ),
    });

    bot.editMessageText("\u2705 Оплата прошла успешно!", {
      chat_id: chatID,
      message_id: states[chatID].messageID,
    });
  } catch (err) {
    console.error(err.message);
  }
}

//2705 - зеленая галочка
