import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BillPage } from '../bill/bill';

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner) {
  }

  goToBillPage() {
    this.navCtrl.push(BillPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
          // alert(text);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            this.navCtrl.pop();
          });

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show()
          .then((data : QRScannerStatus)=> { 
            console.log('datashowing', data.showing);
            //alert(data.showing);
          },err => {
            //alert(err);

          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));      
  }



}
