sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "com/lab2dev/firstapp/model/models",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageBox, models) {
    "use strict";

    return Controller.extend("com.lab2dev.firstapp.controller.Home", {
      onInit: function () {
        const params = {
          urlParameters: {
            $expand: "Category",
          },
        };

        const products = models.getProducts(params);

        products
          .then((oProductsModels) => {
            this.getView().setModel(oProductsModels, "products");
          })
          .catch((oError) => {
            MessageBox.error(oError);
          });
      },

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
