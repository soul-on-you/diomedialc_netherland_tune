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
  adminActionEditServerFields: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Название пары", callback_data: "editServerName" }],
        [{ text: "API ключ пары", callback_data: "editServerAPIKey" }],
        [{ text: "Все поля пары", callback_data: "editServerAllFields" }],
        [{ text: "Назад", callback_data: "backToAdminEditDB" }],
      ],
    }),
  },

  allActionAddOrderToCart: function (count, totalPrice) {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            { text: "-1 \u1F53B", callback_data: "orderRemoveServer" },
            { text: `${count} шт` },
            { text: "+1 \u1F53A", callback_data: "orderAddServer" },
          ],
          [
            {
              text: `Оплатить ${totalPrice}₽`,
              callback_data: "orderShowPayMethods",
            },
          ],
          [{ text: "Назад \u25BC", callback_data: "backToShowServerList" }],
        ],
      }),
    };
  },

  allActionChoosePayMethod: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "Qiwi", callback_data: "orderQiwiPay" },
          { text: "Картой", callback_data: "orderCardPay" },
        ],
        [{ text: "Назад \u25BC", callback_data: "backToAddOrderToCart" }],
      ],
    }),
  },

  allActionPayOrder: function (payURL, totalPrice) {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: `Оплатить ${totalPrice}₽`, url: payURL }],
          [{ text: "Отмена \u274C", callback_data: "backToShowActions" }],
        ],
      }),
    };
  },
};

// console.log("⥢"); //\u1F53B    //\u12962
