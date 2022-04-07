import { HandlePayedOrder } from "./index";
import { GetBillChatID } from ".././services";

export default async function (
  billIDs,
  qiwiApi,
  bot,
  states,
  UserTunnelsModel
) {
  for (const billID of billIDs) {
    const billInfo = await qiwiApi.getBillInfo(billID);

    if (billInfo.status.value === "PAID") {
      const chatID = GetBillChatID(billID, states); //states.find((state) => (state.billID = billID));

      await HandlePayedOrder(bot, chatID, states, UserTunnelsModel);

      bot.sendMessage(
        process.env.ADMIN_ID,
        `Клиент ${chatID} оплатил ${states[chatID].orderCount} мес. на сервере ${states[chatID].serverID}`
      );

      states[chatID] = {};
      billIDs.splice(billIDs.indexOf(billID), 1);
    }

    if (billInfo.status.value === "EXPIRED") {
      console.log(billInfo);

      const chatID = GetBillChatID(billID, states);

      bot.editMessageText("\u{1F6AC} срок оплаты истек", {
        chat_id: chatID,
        message_id: states[chatID].messageID,
      });

      bot.sendMessage(
        process.env.ADMIN_ID,
        `Клиент ${chatID} не оплатил ${states[chatID].orderCount} мес. на сервере ${states[chatID].serverID}`
      );

      states[chatID] = {};
      billIDs.splice(billIDs.indexOf(billID), 1);
    }
  }
}

//1F6AC - smoking
