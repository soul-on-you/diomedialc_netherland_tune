import dotenv from "dotenv";
import QiwiBillPaymentsAPI from "@qiwi/bill-payments-node-js-sdk";

export default async function (billID) {
  dotenv.config();

  const qiwiApi = new QiwiBillPaymentsAPI(process.env.qiwi_private_api);

  const billInfo = await qiwiApi.getBillInfo(billID);

  console.log(billInfo);

  if (billInfo.status.value !== "PAID") {
    qiwiApi.cancelBill("2fe8a831-075a-4a05-97ad-cca3d299e842").then((data) => {
      console.log(data);
    });
  }
  console.log("closed");
}
