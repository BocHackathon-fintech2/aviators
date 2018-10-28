import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Account } from '../../model/account.model';
import { AccountListService } from '../../services/account-list.service';
import { AuthService } from '../../services/auth.service';
import { BocService } from '../../services/boc.service';
import { AccountModalPage } from '../account-modal/account-modal';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserOptions } from '@ionic-native/in-app-browser';


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
    userId: '',
    accountId: '',
    availableBalance: '',
    currentBalance: ''
  };

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  constructor(public navCtrl: NavController, public afDb: AngularFireDatabase, accountListService: AccountListService, public authService: AuthService, http: HttpClient, public bocService: BocService, private iab: InAppBrowser, public modalCtrl: ModalController) {
    this.accountListService = accountListService;
    this.userId = authService.getAuthenticatedUser().uid
    this.accountList = this.afDb.list('account-list/').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
  }

  viewAccount(accountId) {
    window.localStorage.setItem("authCode", "AAIkZmVlZjkzOTEtMzY3ZS00NzExLTlkZDgtMTI5NTA2MGEyNjc07DVbeOPTs-v0WBJrSOgf4Ou0XmJw1lErJvzEJQpoHhEu6jllKf8vpc7PQAByLJms1MuSs-EC6UsEGdrDX6fvfjYhxflQjH3Tm9GO8GhJf3iv_mtJj5Nbbgg6Xy7omx0usK6br7zxPiHAqEGxhiYEtg");

    this.bocService.getAccountDetails(accountId).then(data => {
      console.log(data);
    });
  }

  addAccount(account: Account) {

    let acountModal = this.modalCtrl.create(AccountModalPage);
    acountModal.present();
    acountModal.onDidDismiss(data => {

      this.bocService.getClientCredentials().then(data => {
        console.log("getClientCredentials: ", data);

        var accessToken = data['access_token'];
        window.localStorage.setItem("authCode", accessToken.toString());

        this.bocService.createSubscription(accessToken).then(data => {
          console.log("createSubscription: ", data);

          var subscriptionId = data['subscriptionId'];
          window.localStorage.setItem('subscriptionId', subscriptionId);

          this.loginToBOC(subscriptionId).then(bocCode => {
            // alert("after loginToBOC auth code:" + bocCode);

            this.bocService.authorization(bocCode).then(response => {

              console.log(response['access_token']);

              window.localStorage.setItem("authCode2", response['access_token']);

              this.bocService.retrieveSubscriptionTemplate().then(data => {

                var body = data[0];

                this.bocService.updateSubscriptionTemplate(body).then(res => {

                  this.bocService.getSelectedAccounts().then((accounts:any[]) => {
                    accounts.forEach(ac => {
                      var account: Account = {
                        title: ac['accountName'],
                        accountId: ac['accountId'],
                        userId: this.userId.toString(),
                        availableBalance: '',
                        currentBalance: ''
                      };

                      this.bocService.getAccountDetails(account.accountId).then(data => {
                        console.log(data);

                        var balances = data[0].balances;
                        account.availableBalance = balances[0].amount.toString();
                        account.currentBalance = balances[0].amount.toString();

                        this.accountListService.addAccount(account);
                      });
                    });
                  })
                });
              });
            })
          });
        })
      });
    });
  }

  loginToBOC(subscriptionId) {
    var redirectUrl = this.bocService.oauthRedirect(subscriptionId);

    return new Promise((resolve, reject) => {

      var win = window.open(redirectUrl, "_blank", "EnableViewPortScale=yes");
      win.addEventListener("loadstart", function (event) {
        if (event['url'].indexOf("http://localhost:8100/redirectUrl?") > -1) {
          let bocCode = event['url'].split('=')[1].split('&')[0];
          win.close();
          // alert("LOGIN BOC RETRIEVED AUTH CODE");
          resolve(bocCode);
        }
      });

    });
  }

  clearAccounts() {
    this.accountListService.clearAccounts();
  }

}
