import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { CurrencyPipe } from '@angular/common';


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
  billRef: firebase.database.Reference

  user: any;

  cur_total: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient, private currencyPipe: CurrencyPipe) {

    this.user = firebase.auth().currentUser.email;

    this.billRef = firebase.database().ref(`/bills/1`);
    this.billRef.on('value', billSnapshot => {
      var myBill = billSnapshot.val();
      this.rows = myBill.item;

      this.rows.forEach(element => {
       
        element['to_check'] = (element['holder'] == this.user) ? "true" : "false";
        element['to_disable'] = !(element['holder'] == this.user) && !(element['holder'] == "") ? "true" : "false"
        //element['cur'] = this.currencyPipe.transform(element['price'], 'EUR', true, '1.2-2');
      });
      this.merchant = myBill['merchant'];
      this.purchase_time = myBill['date_of_purchase'];
      this.calculateTotal( this.rows) 

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

  datachanged(item, rows, e: any) {


    rows.forEach(element => {
      var is_checked = e.checked
      if (element['id'] == item.id) {
        if (is_checked) {
          element['holder'] = this.user;

        } else {
          element['holder'] = "";
        }
        delete element['to_check']
        delete element['to_disable']

        //element['holder'] = (element['id'] == item.id && is_checked) ? user : element['holder'];
      }
    });

    this.calculateTotal(rows);

    var updates = {};
    updates['/item'] = rows;
    console.log(updates)
    this.billRef.update(updates);
    

  }

  calculateTotal(rows) {
    var total = 0;

    rows.forEach(element => {
      if (element['holder'] == this.user) {
        total += element['price'];
      }
    });

    //this.cur_total = this.currencyPipe.transform(total, 'EUR', true, '1.2-2');
    this.cur_total = total;

  }


}
