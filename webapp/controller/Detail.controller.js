sap.ui.define(
  [
    "com/lab2dev/firstapp/controller/BaseController",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
  ],

  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */

  function (Controller, History, JSONModel) {
    "use strict";

    return Controller.extend("com.lab2dev.firstapp.controller.Detail", {
      onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        const routeDetail = oRouter.getRoute("RouteDetail");

        routeDetail.attachPatternMatched(this.onObjectMatched, this);
      },

      onObjectMatched: function (oEvent) {
        const oArgs = oEvent.getParameter("arguments");
        const productId = oArgs.productId;

        const oProductModel = new JSONModel({
          productId: productId,
        });

        this.getView().setModel(oProductModel, "detailView");
      },

      onNavBack: function () {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          this.navTo("RouteHome");
        }
      },
    });
  }
);
