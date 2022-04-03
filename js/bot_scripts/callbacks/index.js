// adminActions
import sendGlobalMessage from "./adminActions/callback_sendGlobalMessage";
import useEditMode from "./adminActions/callback_useEditMode";

// adminEditorMode
import addServer from "./adminEditorMode/callback_addServer";
import editServer from "./adminEditorMode/callback_editServer";
import removeServer from "./adminEditorMode/callback_removeServer";

// editServerInfo
import backToAdminEditServer from "./editServerInfo/callback_backToAdminEditServer";
import editServerAllFields from "./editServerInfo/callback_editServerAllFields";
import editServerIP from "./editServerInfo/callback_editServerIP";
import editServerLeaseEndDate from "./editServerInfo/callback_editServerLeaseEndDate";
import editServerSSH_PASSWORD from "./editServerInfo/callback_editServerSSH_PASSWORD";
import editServerSSH_USER from "./editServerInfo/callback_editServerSSH_USER";

// orderCart
import backToShowServerList from "./orderCart/callback_backToShowServerList";
import orderAddServer from "./orderCart/callback_orderAddServer";
import orderRemoveServer from "./orderCart/callback_orderRemoveServer";
import orderShowPayMethods from "./orderCart/callback_orderShowPayMethods";

// orderPay
import orderCancel from "./orderPay/orderCancel";

// orderPaymentMethod
import backToAddOrderToCart from "./orderPaymentMethod/callback_backToAddOrderToCart";
import orderCardPay from "./orderPaymentMethod/callback_orderCardPay";
import orderQiwiPay from "./orderPaymentMethod/callback_orderQiwiPay";

// userGroupActions
import backToShowActions from "./userGroupActions/callback_backToShowActions";
import showRef from "./userGroupActions/callback_showRef";
import showServers from "./userGroupActions/callback_showServers";
import showUserTunnels from "./userGroupActions/callback_showUserTunnels";

export default {
  sendGlobalMessage,
  useEditMode,

  addServer,
  editServer,
  removeServer,

  backToAdminEditServer,
  editServerAllFields,
  editServerIP,
  editServerLeaseEndDate,
  editServerSSH_PASSWORD,
  editServerSSH_USER,

  backToShowServerList,
  orderAddServer,
  orderRemoveServer,
  orderShowPayMethods,

  orderCancel,

  backToAddOrderToCart,
  orderCardPay,
  orderQiwiPay,

  backToShowActions,
  showRef,
  showServers,
  showUserTunnels,
};
