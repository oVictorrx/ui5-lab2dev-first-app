sap.ui.define(
  [
    "com/lab2dev/firstapp/controller/BaseController",
    "sap/m/MessageBox",
    "com/lab2dev/firstapp/model/models",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/lab2dev/firstapp/model/formatter",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageBox, models, Filter, FilterOperator, formatter) {
    "use strict";

    return Controller.extend("com.lab2dev.firstapp.controller.Home", {
      formatter: formatter,

      onInit: function () {
        const params = {
          urlParameters: {
            $expand: "Category",
          },
        };

        const products = models.getProducts(params);

        const list = this.byId("list");
        list.setBusy(true);

        products
          .then((oProductsModels) => {
            this.getView().setModel(oProductsModels, "products");
          })
          .catch((oError) => {
            MessageBox.error(oError);
          })
          .finally(() => {
            list.setBusy(false);
          });
      },

      onPress: function (oEvent) {
        //Origem do evento, item da lista
        const source = oEvent.getSource();

        //Contexto do item da lista, o nome do model
        const context = source.getBindingContext("products");

        //Index do item da lista
        const path = context.getPath();

        //Acesso ao objeto do item da lista pelo path
        const product = context.getObject(path);

        //Acesso ao ID do produto
        const productId = product.ProductID;

        //Navegação para a rota RouteDetail
        //O Objeto do segundo parâmetro deo navTo é um objeto que a chave é o parâmetro
        //configurado no pattern da rota RouteDetail e o valor é número do ProductId
        this.navTo("RouteDetail", {
          productId: productId,
        });
      },

      onSearch: function (oEvent) {
        //add filter for search
        const aFilters = [];
        const sQuery = oEvent.getSource().getValue();

        if (sQuery && sQuery.length > 0) {
          const filter = new Filter(
            "ProductName",
            FilterOperator.Contains,
            sQuery
          );
          aFilters.push(filter);
        }

        // update list binding
        const oList = this.byId("list");
        const oBinding = oList.getBinding("items");
        oBinding.filter(aFilters);
      },

      onSearchOData: function (oEvent) {
        const sQuery = oEvent.getSource().getValue();

        const params = {
          urlParameters: {
            $expand: "Category",
          },
          filters: [new Filter("ProductName", FilterOperator.Contains, sQuery)],
        };

        const products = models.getProducts(params);

        const list = this.byId("list");
        list.setBusy(true);

        products
          .then((oProductsModel) => {
            this.getView().setModel(oProductsModel, "products");
          })
          .catch((oError) => {
            MessageBox.error(oError);
          })
          .finally(() => {
            list.setBusy(false);
          });
      },

      onOpenDialog: function () {
        const viewId = this.getView().getId();

        if (!this.dialog) {
          this.dialog = sap.ui.xmlfragment(
            viewId,
            "com.lab2dev.firstapp.view.fragments.Dialog",
            this
          );
          this.getView().addDependent(this.dialog);
        }

        this.dialog.open();
      },

      onCloseDialog: function () {
        this.dialog.close();
      },
    });
  }
);
