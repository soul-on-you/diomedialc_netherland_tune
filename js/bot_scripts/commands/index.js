// adminActions
import sendGlobalMessage from "./adminActions/command_sendGlobalMessage";

// base
import start from "./base/command_start";
import info from "./base/command_info";

// editServers
import addServer from "./editServers/commands_addServer";

// userGroupActions
import getUserTunnelPassword from "./userGroupActions/getUserTunnelPassword";

export default {
  sendGlobalMessage,

  start,
  info,

  addServer,

  getUserTunnelPassword,
};
