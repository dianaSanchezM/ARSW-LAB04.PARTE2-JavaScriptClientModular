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

function addOrder(){
    var body = document.getElementById('Tabla');
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    var tr1= document.createElement('tr');
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
    for (var i = 0; i < 3; i++) {
        var tr = document.createElement('tr');
        
        var td4 = document.createElement('td');
        td4.appendChild(document.createTextNode('PIZZA'));
        tr.appendChild(td4);
        var td5 = document.createElement('td');
        td5.appendChild(document.createTextNode('3'));
        tr.appendChild(td5);
        var td6 = document.createElement('td');
        td6.appendChild(document.createTextNode('10000'));
        tr.appendChild(td6);
            
        tbl.appendChild(tr);
    }
    body.appendChild(tbl);
}


