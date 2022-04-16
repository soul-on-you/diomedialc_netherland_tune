export default {
  adminActions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Мои vpn-тунели", callback_data: "showUserTunnels" }],
        [{ text: "Выбрать сервер", callback_data: "showServers" }],
        [{ text: "Гайд", url: "http://www.example.com" }], // Сделать ссылкой
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
        [{ text: "Мои vpn-тунели", callback_data: "showUserTunnels" }],
        [{ text: "Выбрать сервер", callback_data: "showServers" }],
        [{ text: "Гайд", url: "http://www.example.com" }], // Сделать ссылкой
        [{ text: "Реферальная программа", callback_data: "showRef" }],
      ],
    }),
  },
  userActions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Мои vpn-тунели", callback_data: "showUserTunnels" }], // добавить кнопку назад
        [{ text: "Выбрать сервер", callback_data: "showServers" }], // добавить кнопку назад
        [{ text: "Гайд", url: "http://www.example.com" }], // Сделать ссылкой
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
        [{ text: "Назад \u25BC", callback_data: "backToShowActions" }],
      ],
    }),
  },
  adminActionEditServerFields: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "IP", callback_data: "editServerIP" }],
        [{ text: "SSH_USER", callback_data: "editServerSSH_USER" }],
        [{ text: "SSH_PASSWORD", callback_data: "editServerSSH_PASSWORD" }],
        [{ text: "LeaseEndDate", callback_data: "editServerLeaseEndDate" }],
        [{ text: "Все поля", callback_data: "editServerAllFields" }],
        [{ text: "Назад \u25BC", callback_data: "backToAdminEditServer" }],
      ],
    }),
  },
  adminBackToEditServer: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Назад \u25BC", callback_data: "backToAdminEditServer" }],
      ],
    }),
  },

  allActionAddOrderToCart: function (count, totalPrice) {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            { text: "-1 \u{1F53B}", callback_data: "orderRemoveServer" },
            // { text: `${count} шт`, callback_data: "" },
            {
              text: `${count} мес.`,
              callback_data: "none",
            },
            { text: "+1 \u{1F53A}", callback_data: "orderAddServer" },
          ],
          [
            {
              text: `Оплатить ${totalPrice}₽`,
              callback_data: "orderShowPayMethods",
            },
          ],
          [{ text: "Назад \u25BC", callback_data: "showServers" }], // было backToShowServerList
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
          [{ text: `Оплатить ${totalPrice}₽`, url: `${payURL}` }],
          [{ text: "Отмена \u274C", callback_data: "orderCancel" }],
        ],
      }),
    };
  },

  allBackToMain: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Назад \u25BC", callback_data: "backToShowActions" }],
      ],
    }),
  },

  allBackToCallback: function (execCallback) {
    return {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: "Назад \u25BC", callback_data: execCallback }],
        ],
      }),
    };
  },

  allUserTunnelInfo: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Показать пороль", callback_data: "showUserTunnelsPassword" }],
        // [{ text: "Поменять пороль", callback_data: execCallback }],
        [{ text: "Получить конфиг VPN", callback_data: "getUserTunnelOVPN" }],
        [{ text: "Продлить подписку", callback_data: "continueSublit" }],
        [{ text: "Назад \u25BC", callback_data: "showUserTunnels" }],
      ],
    }),
  },

  allUserGetPassword: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "\u2705 Подтвердить пороль",
            callback_data: "confirmUserTunnelPassword",
          },
        ],
        [
          {
            text: "\u267B Изменить пороль",
            callback_data: "newUserTunnelPassword",
          },
        ],
        [{ text: "Назад \u25BC", callback_data: "showUserTunnels" }],
      ],
    }),
  },
};

// console.log("⥢"); //\u1F53B    //\u12962
