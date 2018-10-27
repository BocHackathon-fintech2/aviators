import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MerchantsPage } from '../merchants/merchants';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = MerchantsPage;

  constructor(private _NAV: NavController) { }

  logOut(): void {
    console.log("Logging out...");
  }
}
