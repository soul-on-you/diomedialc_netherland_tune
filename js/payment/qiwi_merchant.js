import dotenv from "dotenv";
import QiwiBillPaymentsAPI from "@qiwi/bill-payments-node-js-sdk";

export default async function (price) {
  dotenv.config();

  const qiwiApi = new QiwiBillPaymentsAPI(process.env.qiwi_private_api);

  const billing = qiwiApi.generateId();

  const expirationDateTime = qiwiApi.getLifetimeByDay(21 / 1440);

  const fields = {
    amount: price,
    currency: "RUB",
    expirationDateTime: expirationDateTime,
    comment: "Цифровые услуги в сфере интернет соединений",
    customFields: { themeCode: process.env.qiwi_theme_api },
    successUrl: `https://developer.qiwi.com/ru/p2p-payments`,
  };

  try {
    const qiwiApiResponse = await qiwiApi.createBill(billing, fields);

    console.log(qiwiApiResponse);

    return [qiwiApiResponse.billId, qiwiApiResponse.payUrl];
  } catch (err) {
    console.log(err.message);
    return null;
  }
}
