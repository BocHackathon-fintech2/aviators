import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { MerchantsPage } from '../pages/merchants/merchants';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ScanPage } from '../pages/scan/scan';
import { AccountsPage } from '../pages/accounts/accounts';
import { HistoryPage } from '../pages/history/history';
import { BillPage } from '../pages/bill/bill';
import { SignupPage } from '../pages/signup/signup';
import { AccountModalPage } from '../pages/account-modal/account-modal';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from '../config';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

import { AccountListService } from '../services/account-list.service';
import { BocService } from '../services/boc.service';
import { HttpClientModule } from '@angular/common/http';


import { NameListService } from '../services/name-list.service';

import {NgxErrorsModule} from '@ultimate/ngxerrors';

import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    MerchantsPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ScanPage,
    AccountsPage,
    HistoryPage,
    BillPage,
    AccountModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    NgxErrorsModule,
    HttpClientModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    MerchantsPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ScanPage,
    AccountsPage,
    HistoryPage,
    AccountModalPage,
    BillPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    AngularFireAuth,
    AuthService,
    NameListService,
    QRScanner,
    AccountListService,
    BocService,
    BrowserTab,
    InAppBrowser
  ]
})
export class AppModule {}
