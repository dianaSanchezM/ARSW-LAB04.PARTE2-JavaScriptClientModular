var OrdersControllerModule = (function () {

  var showOrdersByTable = function () {
    //Todo implement

    var callback = {

        onSuccess: function(totalOrders){
            for (j in totalOrders){
                var body = document.getElementById('Tabla');
                var tbl = document.createElement("table");
                tbl.id='table'+j;
                tbl.style.width = '100%';
                var tr1= document.createElement('tr');
                var td0= document.createElement('td');
                td0.appendChild(document.createTextNode('Order'));
                tr1.appendChild(td0)
                var td1 = document.createElement('td');
                td1.appendChild(document.createTextNode('Product'));
                tr1.appendChild(td1);
                var td2 = document.createElement('td');
                td2.appendChild(document.createTextNode('Quantity'));
                tr1.appendChild(td2);
                var td3 = document.createElement('td');
                td3.appendChild(document.createTextNode('Price'));
                tr1.appendChild(td3);
                tbl.appendChild(tr1);
                var properties = Object.keys(totalOrders[j].orderAmountsMap);
                for (var i = 0; i < Object.keys(totalOrders[j].orderAmountsMap).length; i++) {
                    var tr = document.createElement('tr');
                    var td7= document.createElement('td');
                    i==0 ? td7.appendChild(document.createTextNode(j)):null;

                    var td4 = document.createElement('td');
                    td4.appendChild(document.createTextNode(properties[i]));

                    var td5 = document.createElement('td');
                    td5.appendChild(document.createTextNode(totalOrders[j].orderAmountsMap[properties[i]]));
                    var td6 = document.createElement('td');
                    td6.appendChild(document.createTextNode(''));

                    tr.appendChild(td7);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    tbl.appendChild(tr);
                }
                body.appendChild(tbl);

            }
            addPrice();


            },
        onFailed: function(exception){
            console.log(exception);
            alert("There is a problem with our servers. We apologize for the inconvince, please try again later");  
        }
    }
    RestaurantRestController.getOrders(callback)
  };

  var updateOrder = function () {
    // todo implement
  };

  var deleteOrderItem = function (itemName) {
    // todo implement
  };

  var addItemToOrder = function (orderId, item) {
    // todo implement
  };

  return {
    showOrdersByTable: showOrdersByTable,
    updateOrder: updateOrder,
    deleteOrderItem: deleteOrderItem,
    addItemToOrder: addItemToOrder
  };

})();