export default async function (UsersModel, chatID, adminRules, moderRules, userRules){
    const user = await UsersModel.findOne({ where: { chatID: chatID } });
    switch (user.rules) {
      case "ADMIN":
        return adminRules;
      case "MODERATOR":
        return moderRules;
      case "USER":
        return userRules;
    }
}