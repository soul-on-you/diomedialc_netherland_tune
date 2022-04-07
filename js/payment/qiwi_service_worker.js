import dotenv from "dotenv";
import QiwiBillPaymentsAPI from "@qiwi/bill-payments-node-js-sdk";
import interval from "interval-promise";
import { QiwiCheckPay } from "./index";

export default async function (billIDs, bot, states, UserTunnelsModel) {
  dotenv.config();

  const qiwiApi = new QiwiBillPaymentsAPI(process.env.qiwi_private_api);

  interval(async () => {
    await QiwiCheckPay(billIDs, qiwiApi, bot, states, UserTunnelsModel);
  }, 5000);
}
