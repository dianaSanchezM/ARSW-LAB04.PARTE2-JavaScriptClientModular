var RestControllerModule = (function () {

  var getOrders = function (callback) {
    axios.get('/orders')
            .then(function(orders){
                callback.onSuccess(orders.data);
                //OrdersControllerModule.showOrdersByTable();
                console.log(orders)
            })
            .catch(function(error){
                callback.onFailed(error);
                console.log(error);
            });
  };

  var updateOrder = function (order, callback) {
    // todo implement
  };

  var deleteOrder = function (orderId, callback) {
    // todo implement
  };

  var createOrder = function (order, callback) {
    // todo implement
  };

  return {
    getOrders: getOrders,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
    createOrder: createOrder
  };

})();