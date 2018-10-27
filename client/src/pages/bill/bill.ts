import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillPage');
    this.qr_response = this.httpClient.get('https://stark-lowlands-94641.herokuapp.com/qrcodeurl');
    this.qr_response
    .subscribe(data => {
      console.log('my data: ', data);
      this.rows = data['item'];
      this.merchant = data['merchant']
      this.purchase_time = data['date_of_purchase']
    })
  }

}
