import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MerchantsPage } from '../merchants/merchants';
import { LoginPage } from '../login/login';

import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
 
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = MerchantsPage;

  constructor(private _NAV: NavController, private auth : AuthService ) { }

  logOut(): void {
    this.auth.signOut();
    this._NAV.setRoot(LoginPage)
  }


  
}
