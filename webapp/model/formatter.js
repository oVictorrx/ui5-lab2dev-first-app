sap.ui.define([], () => {
  "use strict";

  return {
    toUpperCase: function (sValue) {
      if (!sValue) {
        return sValue;
      }

      return sValue.toUpperCase();
    },

    checkStockText: function (UnitsInStock, UnitsOnOrder) {
      if (Number.isNaN(UnitsInStock) || Number.isNaN(UnitsOnOrder)) {
        return null;
      }

      if (UnitsInStock < UnitsOnOrder) {
        return "Update Stock";
      }

      return "Stock Up To Date";
    },

    checkStockState: function (UnitsInStock, UnitsOnOrder) {
      if (Number.isNaN(UnitsInStock) || Number.isNaN(UnitsOnOrder)) {
        return "None";
      }

      if (UnitsInStock < UnitsOnOrder) {
        return "Error";
      }

      return "Success";
    },
  };
});
