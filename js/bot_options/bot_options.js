export default {
  adminActions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Мои vpn-тунели", callback_data: "showUserTunels" }],
        [{ text: "Выбрать сервер", callback_data: "showServers" }],
        [{ text: "Гайд", callback_data: "showFAQ" }], // Сделать ссылкой
        [{ text: "Редактировать", callback_data: "useEditMode" }],
        [
          {
            text: "Отправить сообщение всем юзерам",
            callback_data: "sendGlobalMessage",
          },
        ],
      ],
    }),
  },
  moderatorActions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Мои vpn-тунели", callback_data: "showUserTunels" }],
        [{ text: "Выбрать сервер", callback_data: "showServers" }],
        [{ text: "Гайд", callback_data: "showFAQ" }], // Сделать ссылкой
        [{ text: "Реферальная программа", callback_data: "showRef" }],
      ],
    }),
  },
  userActions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Мои vpn-тунели", callback_data: "showUserTunels" }], // добавить кнопку назад
        [{ text: "Выбрать сервер", callback_data: "showServers" }], // добавить кнопку назад
        [{ text: "Гайд", callback_data: "showFAQ" }], // Сделать ссылкой
        [{ text: "Реферальная программа", callback_data: "showRef" }], // добавить кнопку назад
      ],
    }),
  },

  adminActionEditServer: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Добавить сервер", callback_data: "addServer" }],
        [{ text: "Редактировать сервер", callback_data: "changeServer" }],
        [{ text: "Удалить сервер", callback_data: "removeServer" }],
        [{ text: "Назад", callback_data: "backToShowActions" }],
      ],
    }),
  },
  adminActionEditCurrenciesFields: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Название пары", callback_data: "editCurrencyName" }],
        [{ text: "API ключ пары", callback_data: "editCurrencyAPIKey" }],
        [{ text: "Все поля пары", callback_data: "editCurrencyAllFields" }],
        [{ text: "Назад", callback_data: "backToAdminEditDB" }],
      ],
    }),
  },

  allActionShowAllUnfollowed: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Валютные пары", callback_data: "showUnfollowedCurrency" }],
        [{ text: "Акции", callback_data: "showUnfollowedSecurity" }],
        [{ text: "Назад", callback_data: "backToShowActions" }],
      ],
    }),
  },
  allActionShowFollowed: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Валютные пары", callback_data: "showFollowedCurrency" }],
        [{ text: "Акции", callback_data: "showFollowedSecurity" }],
        [{ text: "Назад", callback_data: "backToShowActions" }],
      ],
    }),
  },
};
