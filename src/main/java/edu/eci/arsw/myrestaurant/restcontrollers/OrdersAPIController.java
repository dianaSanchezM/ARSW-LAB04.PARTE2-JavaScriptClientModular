/*
 * Copyright (C) 2016 Pivotal Software, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package edu.eci.arsw.myrestaurant.restcontrollers;

import com.google.gson.Gson;
import edu.eci.arsw.myrestaurant.beans.impl.BasicBillCalculator;
import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.model.ProductType;
import edu.eci.arsw.myrestaurant.model.RestaurantProduct;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServices;
import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hcadavid
 */
@Service
@RestController
@RequestMapping(value = "/orders")
public class OrdersAPIController {
    @Autowired
    RestaurantOrderServices orderServices= null;
    
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getOrders(){
        try{
            ArrayList<Order> orders= new ArrayList<>();
            for (int i:orderServices.getTablesWithOrders()){
                orders.add(orderServices.getTableOrder(i));
            }
            return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
        } catch (Exception e) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("Error",HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(value ="/{idmesa}")
    public ResponseEntity<?>  getOrderById(@PathVariable("idmesa") int idMesa){
        try{
            return new ResponseEntity<>(orderServices.getTableOrder(idMesa),HttpStatus.ACCEPTED);
        }catch (Exception e){
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("ERROR 404 Order "+idMesa+" not found",HttpStatus.NOT_FOUND);
        }
    }
    //curl -i -X POST -HContent-Type:application/json -HAccept:application/json http://localhost:8080/orders -d '{"orderAmountsMap":{"PIZZA":3,"HAMBURGER":2,"BEER":2}, "tableNumber":2}'

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addOrder(@RequestBody Order newOrder){
        try {
            orderServices.addNewOrderToTable(newOrder);
            return new ResponseEntity<>(HttpStatus.CREATED);
	} catch (Exception ex) {
            Logger.getLogger( OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error: Orden no creada",HttpStatus.FORBIDDEN);            
	}  
    }
    
    @RequestMapping(value ="/{idmesa}/total")
    public ResponseEntity<?>  getTotalOrder(@PathVariable("idmesa") int idMesa){
        try{
            return new ResponseEntity<>(orderServices.calculateTableBill(idMesa),HttpStatus.ACCEPTED);
        }catch (Exception e){
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("ERROR 404 Order "+idMesa+" not found",HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(value = "/{idmesa}", method = RequestMethod.PUT)
    public ResponseEntity<?> addAnOrdersProduct(@PathVariable("idmesa") int idmesa , @RequestBody String newProduct){
        try{
            if (orderServices.getTableOrder(idmesa).getOrderAmountsMap().containsKey(newProduct)){
                int cant= orderServices.getTableOrder(idmesa).getOrderAmountsMap().get(newProduct);
                orderServices.getTableOrder(idmesa).getOrderAmountsMap().put(newProduct, cant+1);
            }else{
                orderServices.getTableOrder(idmesa).addDish(newProduct, 1);
            }
            
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch(Exception e){
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("ERROR product has not be added",HttpStatus.NOT_FOUND);
        }
    }
    //curl -i -X PUT -HContent-Type:application/json -HAccept:application/json http://localhost:8080/orders/3 -d 'PIZZA'

    @RequestMapping(value ="/product/{productName}")
    public ResponseEntity<?>  getProductByName(@PathVariable("productName") String name){
        try{
            return new ResponseEntity<>(orderServices.getProductByName(name),HttpStatus.ACCEPTED);
        }catch (Exception e){
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("ERROR 404 Product "+name+" not found",HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(method = RequestMethod.DELETE, value = "/{idmesa}")
    public ResponseEntity cancelOrderByTable(@PathVariable("idmesa") int idmesa){
        try {
            orderServices.releaseTable(idmesa);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (OrderServicesException ex) {
            Logger.getLogger(OrdersAPIController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Order have not deleted",HttpStatus.NOT_FOUND);
        }
    }
    //curl -i -X DELETE -HContent-Type:application/json -HAccept:application/json http://localhost:8080/orders/1 

}

 