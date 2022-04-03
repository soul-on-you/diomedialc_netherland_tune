import dotenv from "dotenv";

dotenv.config();

export default async function (bot, chatID, msg, UsersModel) {
  try {
    if (chatID == process.env.ADMIN_ID) {
      await UsersModel.create({ chatID: chatID, rules: "ADMIN" });
    } else {
      await UsersModel.create({ chatID: chatID });
    }
  } catch (e) {
    if (e.name != "SequelizeUniqueConstraintError") {
      const eMsg =
        await "Неудалось создать запись нового пользователя в БД! попробуйте позже!\n";
      await console.error(`${eMsg}\n${chatID}\n${e}\n`);
      console.log(e.name);
      return bot.sendMessage(chatID, eMsg);
    }
  }
  await bot.sendSticker(
    chatID,
    `CAACAgIAAxkBAAMnYiouYynylMK9Uv6l5pi5p6VJU8MAAqkAA0aSAS9evFTSF6HhoiME`
  );
  return bot.sendMessage(
    chatID,
    `Привет! ${msg.from.first_name} ${msg.from.last_name}`
  );
}
