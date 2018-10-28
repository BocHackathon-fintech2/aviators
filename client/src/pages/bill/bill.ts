import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

import { Name } from '../../model/name/name.model';
import { NameListService } from '../../services/name-list.service';


/**
 * Generated class for the BillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill',
  templateUrl: 'bill.html',
})
export class BillPage {

  qr_response: Observable<any>;
  rows: Observable<any>;
  merchant: any;
  purchase_time: any;
  rooms: any;
  ref: any;
  nameList: Observable<Name[]>
  billRef: firebase.database.Reference

  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {

    var user = firebase.auth().currentUser.email;

    this.billRef = firebase.database().ref(`/bills/1`);
    this.billRef.on('value', billSnapshot => {
      var myBill = billSnapshot.val();
      this.rows = myBill.item;
            
      this.rows.forEach(element => {
        element['to_check'] = (element['holder'] == user ) ? "true" : "false";
        element['to_disable'] = !(element['holder'] == user) &&  !(element['holder'] == "") ? "true" : "false"
      });
      this.merchant = myBill['merchant'];
      this.purchase_time = myBill['date_of_purchase'];


    });
  }



  ionViewDidLoad() {


    // const billRef: firebase.database.Reference = firebase.database().ref(`/bills/1`);
    // billRef.on('value', billSnapshot => {
    //   var myBill = billSnapshot.val();
    //   console.log(myBill);
    //   this.rows = myBill.item;
    //   this.merchant = myBill['merchant'];
    //   this.purchase_time = myBill['date_of_purchase'];


    // });
  }

  datachanged(item, rows, e: any){
    var user = firebase.auth().currentUser.email;
    
    rows.forEach(element => {
      var is_checked = e.checked
      if (element['id'] == item.id){
        if (is_checked){
          element['holder'] = user; 
        }else{
          element['holder'] = "";
        }
        delete element['to_check']
        delete element['to_disable']
      
      //element['holder'] = (element['id'] == item.id && is_checked) ? user : element['holder'];
    }
  });
    var updates = {};
    updates['/item/'] = rows;
    this.billRef.update(updates);

  }

}
