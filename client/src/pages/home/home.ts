import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ScanPage } from '../scan/scan';
import { AccountsPage } from '../accounts/accounts';
import { HistoryPage } from '../history/history';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToScanPage() {
    this.navCtrl.push(ScanPage);
  }

  goToAccountsPage() {
    this.navCtrl.push(AccountsPage);
  }

  goToHistoryPage() {
    this.navCtrl.push(HistoryPage);
  }

}
