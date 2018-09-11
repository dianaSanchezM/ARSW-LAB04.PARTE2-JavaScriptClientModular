/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var order1 = {
    "orderAmountsMap":{
        "PIZZA":3,
        "HOTDOG":1,
        "COKE":4
    },
    "tableNumber":2
};

var totalOrders=[];

function addOrder(){
    axios.post('/orders',order1)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
            });
    window.location.reload();
    }


function removeOrderById(id){
    /*
    var order= document.getElementById(id);
    order.parentNode.removeChild(order);
    */
   document.getElementById('table'+id).remove();
   axios.delete('/orders',{params:{idmesa:id}})
           .then(function(response){
               
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
            });
   
}

function loadOrders(){
    //for (var i = 0; i< orders.length; i++){
      //  addOrder(orders[i]);
    //}
    axios.get('/orders')
    
            .then(function(response){
                totalOrders= response.data;
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
                
             })
             .catch(function (error) {
                console.log(error);
                alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
              });
              
}

function loadOrdersById(id){
    axios.get('/orders/',{params:{id:id}})
            
            .then(function(response){
                totalOrders[totalOrders.length-1]=response.data;
            })
            .catch(function (error) {
            console.log(error);
            alert("There is a problem with our servers. We apologize for the inconvince, please try again later");
          });
}

var cells=[];

async function addPrice(){
    for (var i = 0; i < totalOrders.length; i++){
        var o = document.getElementById("table"+i);
        for (var j = 1; j <  Object.keys(totalOrders[i].orderAmountsMap).length+1; j++){
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
    
}

function failedCallBack(){
    
}


/*var orders = [{
    "order_id": 1,
    "table_id": 1,
    "products": [{
    "product": "PIZZA",
    "quantity": 3,
    "price": "$10000"
    },
    {
    "product": "HOTDOG",
    "quantity": 1,
    "price": "$3000"
    },
    {
    "product": "COKE",
    "quantity": 4,
    "price": "$1300"
    }
    ]
},
{
    "order_id": 2,
    "table_id": 2,
    "products": [{
    "product": "HAMBURGUER",
    "quantity": 2,
    "price": "$12300"
    },
    {
    "product": "COKE",
    "quantity": 2,
    "price": "$1300"
    }
    ]
},
{
    "order_id": 3,
    "table_id": 3,
    "products": [{
    "product": "PIZZA",
    "quantity": 4,
    "price": "$10000"
    },
    {
    "product": "HOTDOG",
    "quantity": 1,
    "price": "$3000"
    },
    {
    "product": "COKE",
    "quantity": 4,
    "price": "$13000"
    },
    {
    "product": "BEER",
    "quantity": 1,
    "price": "$1300"
    }
    ]
}

    
];*/

