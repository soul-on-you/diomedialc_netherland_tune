import sequelize from "./db_connection";
import { DataTypes } from "sequelize";

export const Users = sequelize.define("Users", {
  chatID: {
    type: DataTypes.INTEGER,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  rules: {
    type: DataTypes.ENUM,
    values: ["USER", "MODERATOR", "ADMIN"],
    allowNull: false,
    defaultValue: "USER",
  },
});

export const UserTunnels = sequelize.define("UserTunnels", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  chatID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
    references: {
      model: "Users",
      key: "chatID",
    },
  },
  tunnelID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
    references: {
      model: "Tunnels",
      key: "id",
    },
  },
  tunnelSubscriptionsTerm: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

export const Tunnels = sequelize.define("Tunnels", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  emojiCountryCode: {
    type: DataTypes.STRING(4),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clientCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  connectionsSpeed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1024,
  },
});

export const Servers = sequelize.define("Servers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    required: true,
    references: {
      model: "Tunnels",
      key: "id",
    },
  },
  IP: {
    type: DataTypes.STRING(15),
    unique: true,
    allowNull: false,
  },
  SSH_USER: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  SSH_PASSWORD: {
    type: DataTypes.STRING(12),
    allowNull: false,
  },
  LeaseEndDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

// export const UserСurrencies = sequelize.define("UserСurrencies", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     unique: true,
//     autoIncrement: true,
//     allowNull: false,
//   },
//   chatID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     required: true,
//     references: {
//       model: "Users",
//       key: "chatID",
//     },
//   },
//   currencyID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     required: true,
//     references: {
//       model: "Сurrencies",
//       key: "id",
//     },
//   },
// });

// export const Сurrencies = sequelize.define("Сurrencies", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     unique: true,
//     allowNull: false,
//     autoIncrement: true,
//   },
//   currencyName: {
//     type: DataTypes.STRING(7),
//     allowNull: false,
//     unique: true,
//   },
//   currencyAPI: {
//     type: DataTypes.STRING(20),
//     allowNull: false,
//     unique: true,
//   },
// });

// export const UserSecurities = sequelize.define("UserSecurities", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     unique: true,
//     autoIncrement: true,
//     allowNull: false,
//   },
//   chatID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     required: true,
//     references: {
//       model: "Users",
//       key: "chatID",
//     },
//   },
//   securityID: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     required: true,
//     references: {
//       model: "Securities",
//       key: "id",
//     },
//   },
// });

// export const Securities = sequelize.define("Securities", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     unique: true,
//     allowNull: false,
//     autoIncrement: true,
//   },
//   securityName: {
//     type: DataTypes.STRING(16),
//     allowNull: false,
//     unique: true,
//   },
//   securityAPI: {
//     type: DataTypes.STRING(4),
//     allowNull: false,
//     unique: true,
//   },
// });

// export const UserMessages = sequelize.define("UserMessages", {
//   chatID: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     unique: true,
//     allowNull: false,
//     required: true,
//     references: {
//       model: "Users",
//       key: "chatID",
//     },
//   },
//   messageID: {
//     type: DataTypes.BIGINT,
//     unique: true,
//     allowNull: false,
//   },
// });

// export const Сurrencies = sequelize.define("Сurrencies", {
//   currency: {
//     type: DataTypes.STRING(3),
//
//   },
//   currencyAPIKey: {
//     type: DataTypes.STRING(20),
//
//   },
// });

// const User = Sequelize.define("user", {

// });
// const Company = Sequelize.define("company", {

// });

// Company.hasMany(User, { foreignKey: "some_field" });
// User.belongsTo(Company, { foreignKey: "some_field" });
// export default (sequelize, DataTypes) => {
//   return sequelize.define("user", {
//     some_field: {
//       type: DataTypes.INTEGER,
//       required: true,
//       references: {
//         model: "company",
//         key: "some_field",
//       },
//     },
//   });
// };

// const users_panel = sequelize.define('users_panel', {
//     email:  {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     }
// })
// const ads = sequelize.define('ads', {
//     user_panel_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },

// })
// usersPanel.hasMany(ads, {foreignKey: 'user_panel_id', as: 'ads'});
// ads.belongsTo(usersPanel, {foreignKey: 'id', as: 'user'});

// sequelize.sync({force: false})
// .then(data => console.log('ok'))
// .catch(error => console.error(error))

// const users_panel = sequelize.define('users_panel', {
//     email:  {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     }
// })

// const ads = sequelize.define('ads', {
//     user_panel_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },

// })
// usersPanel.hasMany(ads, {foreignKey: 'user_panel_id', as: 'ads'});
// ads.belongsTo(usersPanel, {foreignKey: 'id', as: 'user'});

// sequelize.sync({force: false})
// .then(data => console.log('ok'))
// .catch(error => console.error(error))
