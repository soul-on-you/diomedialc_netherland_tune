import BotOptions from "../../../bot_options";
import { CalculateEndOfLeaseDate } from "../../../services";
// import { QiwiPayMerchant } from "../../../payment";
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

  bot.sendInvoice(
    chatID,
    "vpn connect",
    `\u{1F4B3} Оплата товара\n\u{1F4E1} Товар: ${countryCodeEmoji(
      tunnel.emojiCountry
    )} ${tunnel.serverName}\n\u{1F5D3} Подписка до ${CalculateEndOfLeaseDate(
      states[chatID].orderCount
    )}`,
    "cash out",
    process.env.telegram_payment_token_sber,
    "Netherland_VPN",
    "RUB",
    [
      {
        label: `${countryCodeEmoji(tunnel.emojiCountry)} ${tunnel.serverName}`,
        amount: `${orderPrice}00`,
      },
    ],

    {
      max_tip_amount: 200000,
      suggested_tip_amounts: [10000, 25000, 50000, 100000],
      photo_url:
        "https://storage.yandexcloud.net/nethbot.dio/products/product.png",
      need_name: true,
      need_phone_number: true,
      need_email: true,
      need_shipping_address: true,
      photo_width: 799,
      photo_height: 444,
      is_flexible: true,
    }
  );

  // bot.sendInvoice(
  //   chatID,
  //   "VPN CONNECT", // `${tunnel.serverName}`, //title   //${countryCodeEmoji(tunnel.emojiCountry)}
  //   `\u{1F4B3} Оплата товара\n\u{1F4E1} Товар: ${countryCodeEmoji(
  //     tunnel.emojiCountry
  //   )} ${tunnel.serverName}\n\u{1F5D3} Подписка до ${CalculateEndOfLeaseDate(
  //     states[chatID].orderCount
  //   )}`, //description
  //   "cash out", // payload string
  //   process.env.telegram_payment_token, //token
  //   "Netherland_VPN", // start parametr
  //   "RUB", // currency
  //   [
  //     {
  //       label: `${countryCodeEmoji(tunnel.emojiCountry)} ${tunnel.serverName}`,
  //       amount: `${orderPrice}00`,
  //     },
  //   ],

  //   {
  //     max_tip_amount: 200000, // max tip amount
  //     suggested_tip_amounts: [10000, 25000, 50000, 100000], // suggested_tip_amounts
  //     photo_url:
  //       "https://storage.yandexcloud.net/nethbot.dio/products/product.png",
  //     need_name: true,
  //     need_phone_number: true,
  //     need_email: true,
  //     need_shipping_address: true,
  //     photo_width: 200,
  //     photo_height: 150,
  //     is_flexible: true,
  //   }
  // );

  bot.on("pre_checkout_query", (query) => {
    console.log(`[bot] pre checkout`);
    console.log(query);
    bot.answerPreCheckoutQuery(query.id, true);
  });
  bot.on("successful_payment", (msg) => {
    console.log(`[bot] successful payment`);
    console.log("Successful Payment", msg);
    bot.sendMessage(msg.chat.id, "Thank you for your purchase!");
  });
  // * Verifica o status do pagamento
  // bot.on("message", function (message) {
  //   if (message.successful_payment != undefined) {
  //     console.log("sucessful_paymeny", message);

  //     var savedPayload = message.successful_payment.invoice_payload; // get from db
  //     var savedStatus = "WAIT"; // get from db, this should be "WAIT"
  //     console.log(
  //       savedPayload != message.successful_payment.invoice_payload,
  //       savedStatus != "WAIT"
  //     );
  //     if (
  //       savedPayload != message.successful_payment.invoice_payload ||
  //       savedStatus != "WAIT"
  //     ) {
  //       // match saved data to payment data received
  //       bot.sendMessage(message.chat.id, "Payment verification failed");
  //       return;
  //     }

  //     // payment successfull
  //     bot.sendMessage(message.chat.id, "Payment complete!");
  //   }
  // });
  // };

  // bot.editMessageText(
  //   `\u{1F4B3} Оплата товара\n\n\u{1F4E1} Товар: ${countryCodeEmoji(
  //     tunnel.emojiCountry
  //   )} ${
  //     tunnel.serverName
  //   }\n\n\u{1F4B5}Сумма к оплате: ${orderPrice}₽\n\n\u{1F5D3} Подписка до ${CalculateEndOfLeaseDate(
  //     states[chatID].orderCount
  //   )} `,
  //   {
  //     chat_id: chatID,
  //     message_id: messageID,
  //     ...BotOptions.allActionPayOrder(payUrl, orderPrice),
  //   }
  // );

  // const [billID, payUrl] = await QiwiPayMerchant(orderPrice);

  // billIDs.push(billID);

  // states[chatID] = {
  //   ...states[chatID],
  //   messageID: messageID,
  //   billID: billID,
  //   payUrl: payUrl,
  // };

  // bot.editMessageText(
  //   `\u{1F4B3} Оплата товара\n\n\u{1F4E1} Товар: ${countryCodeEmoji(
  //     tunnel.emojiCountry
  //   )} ${
  //     tunnel.serverName
  //   }\n\n\u{1F4B5}Сумма к оплате: ${orderPrice}₽\n\n\u{1F5D3} Подписка до ${CalculateEndOfLeaseDate(
  //     states[chatID].orderCount
  //   )} `,
  //   {
  //     chat_id: chatID,
  //     message_id: messageID,
  //     ...BotOptions.allActionPayOrder(payUrl, orderPrice),
  //   }
  // );
}
