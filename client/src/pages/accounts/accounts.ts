import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Account } from '../../model/account.model';
import { AccountListService } from '../../services/account-list.service';
import { AuthService } from '../../services/auth.service';
import { BocService } from '../../services/boc.service';

@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})

export class AccountsPage {

  accountListService: AccountListService;
  accountList: Observable<any>
  userId: String

  account: Account = {
    title: '',
    userId: ''
  };

  constructor(public navCtrl: NavController, public afDb: AngularFireDatabase, accountListService: AccountListService, authService: AuthService, http: HttpClient, public bocService: BocService) {
    this.accountListService = accountListService;
    this.user = authService.getAuthenticatedUser();
    this.accountList = this.afDb.list('account-list/').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  addAccount(account: Account) {

    this.bocService.getClientCredentials().then(data => { 
      console.log("getClientCredentials: ", data);
      var accessToken = data && data.access_token;
      this.bocService.createSubscription(accessToken).then(data=>{
        console.log("createSubscription: ", data);

        var subscriptionId = data && data.subscriptionId;

        this.bocService.oauthRedirect(subscriptionId).then(data => {
          console.log("createSubscription: ", data);
        })

      })
    });
  }



  
}
