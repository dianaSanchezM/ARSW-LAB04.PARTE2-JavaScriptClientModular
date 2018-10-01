var OrdersControllerModule = (function () {

    var orders;
  var showOrderByTable = function () {
    //Todo implement
    var option= document.getElementById('numTables').options[document.getElementById('numTables').selectedIndex].text;
    var table = option.split(" ")[1];
    var callback = {

        onSuccess: function(totalOrders){
                    var tbl = document.getElementById('items');
                    tbl.style.width = '100%';
                    while (tbl.getElementsByTagName('tr').length>1){
                        tbl=document.getElementById('items');
                        
                        tbl.deleteRow(tbl.getElementsByTagName('tr').length-1);
                        tbl=document.getElementById('items');
                    }
                    var properties = Object.keys(totalOrders.orderAmountsMap);
                    for (var i = 0; i < Object.keys(totalOrders.orderAmountsMap).length; i++) {
                        var tr = document.createElement('tr');
                        var td= document.createElement('td');
                        td.appendChild(document.createTextNode(properties[i]));
                        var td1 = document.createElement('td');
                        var input =document.createElement('input');
                        input.type="text";
                        input.id=properties[i];
                        input.value=totalOrders.orderAmountsMap[properties[i]];
                        td1.appendChild(input);
                        var td2 = document.createElement('td');
                        var button= document.createElement('button');
                        var funcion= 'OrdersControllerModule.updateOrder('.concat(totalOrders.tableNumber,',"',properties[i],'")');
                        
                        button.setAttribute('onclick',funcion);
                        button.innerHTML="update";
                        td2.appendChild(button);
                        var td3 = document.createElement('td');
                        var delet= document.createElement('button');
                        var funcion2= 'OrdersControllerModule.deleteOrderItem('.concat(totalOrders.tableNumber,',"',properties[i],'")');
                        delet.setAttribute('onclick',funcion2);
                        delet.innerHTML="delete";
                        td3.appendChild(delet);

                        tr.appendChild(td);
                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tbl.appendChild(tr);
                    }
            },
        onFailed: function(exception){
            console.log(exception);
            alert("There is a problem with our servers. We apologize for the inconvince, please try again later");  
        }
    };
    RestControllerModule.getOrder(table,callback);
  };
  
  var showOrdersByTable = function () {
    //Todo implement
    
    var callback = {

        onSuccess: function(totalOrders){
            orders=totalOrders;
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
    };
    RestControllerModule.getOrders(callback);
  };

  var updateOrder = function (orderId, item) {
        var itemQuantity=document.getElementById(item).value;
        var itemjs='{"'.concat(item,'":',itemQuantity,'}');
      var callback = {
        
        onSuccess: function(){
            console.log("Item updated");

        },
        onFailed: function(exception){
            console.log(exception);
            alert("There is a problem with our servers. We apologize for the inconvince, please try again later");  
        }
    };
    RestControllerModule.updateOrder(orderId,itemjs,callback);
  };
  
  var addItem = function (orderId, item) {
        var itemName= item.split(" ")[0];
        var itemQuantity=item.split(" ")[1];
        var itemjs='{"'.concat(itemName,'":',itemQuantity,'}');
        
      var callback = {
        
        onSuccess: function(){
            console.log("Item added");

        },
        onFailed: function(exception){
            console.log(exception);
            alert("There is a problem with our servers. We apologize for the inconvince, please try again later");  
        }
    };
    RestControllerModule.updateOrder(orderId,itemjs,callback);
  };

  var deleteOrderItem = function (orderId,item) {
      var callback = {

        onSuccess: function(){
            console.log("Item deleted");
            location.reload();

        },
        onFailed: function(exception){
            console.log(exception);
            alert("There is a problem with our servers. We apologize for the inconvince, please try again later");  
        }
    };
    RestControllerModule.deleteOrderItem(orderId,item,callback);
  };

  
  var showTablesNumber = function (){
      //modificar select
      
      var callback = {

        onSuccess: function(orders){
            
            var select = document.getElementById('numTables');
            for (i in orders){
                var v1= document.createElement('option');
                v1.setAttribute("value",orders[i].tableNumber);
                v1.innerHTML= "Table "+orders[i].tableNumber;
                select.appendChild(v1);
            }

        },
        onFailed: function(exception){
            console.log(exception);
            alert("There is a problem with our servers. We apologize for the inconvince, please try again later");  
        }
    };
    RestControllerModule.getOrders(callback);
  };
  
  var addPrice=async function(){
    for (var i = 0; i < orders.length; i++){
        var o = document.getElementById("table"+i);
        for (var j = 1; j <  Object.keys(orders[i].orderAmountsMap).length+1; j++){
            var path = "/orders/product/"+o.rows[j].cells[1].innerHTML;    
            var precio;
            await axios.get(path)
                .then(function(response){
                    precio=response.data.price;
                })
                .catch(function(error){
                    console.log(error);
                    alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
                });
                o.rows[j].cells[3].innerHTML=precio;
        }
        
    }
    
    };
    
    var addOrder =function (){
        axios.post('/orders',order1)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
            });
        window.location.reload();
    };
    
    var order1 = {
        "orderAmountsMap":{
            "BEER":5
        },
        "tableNumber":2
    };
    
    var removeOrderById= function(id){
        document.getElementById('table'+id).remove();
        axios.delete('/orders',{params:{idmesa:id}})
           .then(function(response){
               
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
                //alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
            });
   
    };

  return {
    showOrdersByTable: showOrdersByTable,
    showOrderByTable: showOrderByTable,
    updateOrder: updateOrder,
    deleteOrderItem: deleteOrderItem,
    showTablesNumber: showTablesNumber,
    addPrice: addPrice,
    addOrder: addOrder,
    removeOrderById: removeOrderById,
    addItem: addItem
  };
})();

