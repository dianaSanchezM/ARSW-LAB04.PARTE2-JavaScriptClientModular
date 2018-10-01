var RestControllerModule = (function () {

  var getOrders = function (callback) {
    axios.get('/orders')
            .then(function(orders){
                callback.onSuccess(orders.data);
                console.log(orders);
            })
            .catch(function(error){
                callback.onFailed(error);
                console.log(error);
            });
  };
  
  var getOrder = function (id,callback) {
    axios.get('/orders/'+id)
            .then(function(orders){
                callback.onSuccess(orders.data);
                console.log(orders);
            })
            .catch(function(error){
                callback.onFailed(error);
                console.log(error);
            });
  };  

  var deleteOrderItem = function (orderId,product, callback) {
    axios.delete('/orders/'+orderId+'/'+product)
            .then(function(orders){
                callback.onSuccess(orders);
                console.log(orders);
            })
            .catch(function(error){
                callback.onFailed(error);
                console.log(error);
            });
  };
  
  var updateOrder = function (orderId,product, callback) {
    axios.put('/orders/'+orderId, product, {
            headers: {
                'Content-Type': 'application/json'
            }, data: product})
            .then(function(orders){
                callback.onSuccess(orders.data);
                console.log(orders.data);
            })
            .catch(function(error){
                callback.onFailed(error);
                console.log(error);
            });
  };

  var createOrder = function (order, callback) {
    axios.post('/orders',order)
            .then(function(orders){
                callback.onSuccess(orders.data);
                console.log(orders.data);
            })
            .catch(function(error){
                callback.onFailed(error);
                console.log(error);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
            });
  };
  
  var deleteOrder = function (orderId, callback) {
    axios.delete('/orders/'+orderId)
            .then(function(orders){
                callback.onSuccess(orders);
                console.log(orders);
            })
            .catch(function(error){
                callback.onFailed(error);
                console.log(error);
            });
  };

  return {
    getOrders: getOrders,
    getOrder: getOrder,
    deleteOrderItem: deleteOrderItem,
    createOrder: createOrder,
    updateOrder: updateOrder,
    deleteOrder:deleteOrder
  };
  
  

})();