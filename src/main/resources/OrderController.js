/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var order1 = {
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
    "price": "$13000"
    }
    ]
};

function addOrder(order){
    var body = document.getElementById('Tabla');
    var tbl = document.createElement('table');
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
    for (var i = 0; i < order.products.length; i++) {
        var tr = document.createElement('tr');
        var td7= document.createElement('td');
        i==0 ? td7.appendChild(document.createTextNode(order.order_id)):null;
        tr.appendChild(td7);
        var td4 = document.createElement('td');
        td4.appendChild(document.createTextNode(order.products[i].product));
        tr.appendChild(td4);
        var td5 = document.createElement('td');
        td5.appendChild(document.createTextNode(order.products[i].quantity));
        tr.appendChild(td5);
        var td6 = document.createElement('td');
        td6.appendChild(document.createTextNode(order.products[i].price));
        tr.appendChild(td6);
            
        tbl.appendChild(tr);
    }
    body.appendChild(tbl);
}

function removeOrderById(id){
    var order= document.getElementById(id);
    order.parentNode.removeChild(order);
}

function loadOrders(){
    for (var i = 0; i< orders.length; i++){
        addOrder(orders[i]);
    }
}

var orders = [{
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

    
];

