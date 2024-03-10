sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/MessageBox"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.lab2dev.firstapp.controller.Home", {
      onInit: function () {},

      onPress: function (oEvent) {
        const item = oEvent.getSource();

        const itemTitle = item.getTitle();

        const message = `O item: "${itemTitle}" foi clicado!`;

        MessageBox.show(message, {
          title: "Informação do item",
        });
      },
    });
  }
);
