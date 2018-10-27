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
import { SignupPage } from '../pages/signup/signup';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AccountListService } from '../services/account-list.service';
import { BocService } from '../services/boc.service';

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
    HistoryPage
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
    HistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    AngularFireAuth,
    AuthService,
    QRScanner,
    AccountListService,
    BocService
  ]
})
export class AppModule {}
