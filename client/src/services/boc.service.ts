import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class BocService {

  clientId: string
  clientSecret: string
  url: string
  tppId: string
  journeyId: string
  accessToken: string
  subscriptionId: string


  constructor(public httpClient: HttpClient) {
    // this.clientIdH = "417a0214-314c-4cb1-8e2b-71c948840fb5";
    this.clientId = "feef9391-367e-4711-9dd8-1295060a2674";
    // this.clientSecretH = "eH0nK1vS7qU6hW7aP0bJ6jR8cY3jP3gS5oS4bS5eA1nF8uQ8eA";
    this.clientSecret = "vJ1uN4lO2aS0nC0bL8rO6iD6tG4jG8jR2dI6nT3kF1uW1cS8sC";
    this.url = "https://sandbox-apis.bankofcyprus.com/df-boc-org-sb/sb/psd2";
    this.tppId = "singpaymentdata";
    this.journeyId = "abc";
  }

  encodeUriJSON(body) {
    var params = "";

    for (var key in body) {
      params += "&" + key + "=" + body[key];
    }

    params = params.slice(1);

    return params;

  }

  createSubscription(authCode) {

    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + authCode,
        "Content-Type": "application/json",
        "APIm-Debug-Trans-Id": "true",
        "app_name": "myapp",
        "tppid": this.tppId,
        "originUserId": "TPPOAuth2Security",
        "timeStamp": "1540663735",
        "journeyId": this.journeyId
      }
    };

    var body = {
      "accounts": {
        "transactionHistory": true,
        "balance": true,
        "details": true,
        "checkFundsAvailability": true
      },
      "payments": {
        "limit": 99999999,
        "currency": "EUR",
        "amount": 999999999
      }
    }

    var url = this.url + "/v1/subscriptions?client_id=" + this.clientId + "&client_secret=" + this.clientSecret;

    return new Promise(resolve => {

      this.httpClient.post(url, body, httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }

  getClientCredentials() {
    var body = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "client_credentials",
      scope: "TPPOAuth2Security"
    };

    const httpOptions = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    return new Promise(resolve => {
      this.httpClient.post(this.url + "/oauth2/token", this.encodeUriJSON(body), httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  oauthRedirect(subscriptionId) {
    this.subscriptionId = subscriptionId;
    var url = this.url + "/oauth2/authorize?response_type=code&redirect_uri=http://localhost:8100/redirectUrl&scope=UserOAuth2Security&subscriptionid=" + subscriptionId + "&client_id=" + this.clientId;
    return url;
  }

  authorization(bocCode) {

    var body = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "authorization_code",
      scope: "UserOAuth2Security",
      code: bocCode
    };

    const httpOptions = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    return new Promise(resolve => {
      this.httpClient.post(this.url + "/oauth2/token", this.encodeUriJSON(body), httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        // alert(err.toString());
      });
    });
  }

  getAccountDetails(accountId) {
    var authCode = window.localStorage.getItem("authCode");
    var subscriptionId = window.localStorage.getItem("subscriptionId");

    var url = this.url + "/v1/accounts/" + accountId + "?client_id=" + this.clientId + "&client_secret=" + this.clientSecret;

    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + authCode,
        "Content-Type": "application/json",
        "tppId": this.tppId,
        "originUserId": "50520218",
        "timeStamp": new Date().getTime().toString(),
        "journeyId": this.journeyId,
        "subscriptionId": subscriptionId
      }
    };

    return new Promise(resolve => {

      this.httpClient.get(url, httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        // alert("getAccountDetails error: " + err.message);
      });
    });
  }

  retrieveSubscriptionTemplate() {
    var subscriptionId = window.localStorage.getItem("subscriptionId");

    // return new Promise(resolve => {
    //   resolve([
    //     {
    //       "subscriptionId": subscriptionId,
    //       "status": "pending",
    //       "description": "SUBSCRIPTION",
    //       "selectedAccounts": [
    //         {
    //           "accountId": "351012345671"
    //         },
    //         {
    //           "accountId": "351092345672"
    //         }
    //       ],
    //       "accounts": {
    //         "transactionHistory": true,
    //         "balance": true,
    //         "details": true,
    //         "checkFundsAvailability": true
    //       },
    //       "payments": {
    //         "limit": 99999999,
    //         "currency": "EUR",
    //         "amount": 999999999
    //       }
    //     }
    //   ]);
    // });

    var authCode = window.localStorage.getItem("authCode");

    var url = this.url + "/v1/subscriptions/" + subscriptionId + "?client_id=" + this.clientId + "&client_secret=" + this.clientSecret;

    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + authCode,
        "Content-Type": "application/json",
        "APIm-Debug-Trans-Id": "true",
        "tppId": this.tppId,
        "originUserId": "50520218",
        "timestamp": new Date().getTime().toString(),
        "journeyId": this.journeyId
      }
    };

    return new Promise(resolve => {

      this.httpClient.get(url, httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        // alert("retrieveSubscriptionTemplate: " + (err && err.message));
      });
    });
  }

  updateSubscriptionTemplate(body) {
    var authCode2 = window.localStorage.getItem("authCode2");
    var subscriptionId = window.localStorage.getItem("subscriptionId");
    var url = this.url + "/v1/subscriptions/" + subscriptionId + "?client_id=" + this.clientId + "&client_secret=" + this.clientSecret;

    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + authCode2,
        "Content-Type": "application/json",
        "tppid": this.tppId,
        "originUserId": "50520218",
        "timeStamp": new Date().getTime().toString(),
        "journeyId": this.journeyId
      }
    };

    return new Promise(resolve => {

      this.httpClient.patch(url, body, httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        // alert("updateSubscriptionTemplate: " + (err && err.message));
      });
    });
  }

  getSelectedAccounts() {

    var authCode = window.localStorage.getItem("authCode");
    var subscriptionId = window.localStorage.getItem("subscriptionId");

    var url = this.url + "/v1/accounts?client_id=" + this.clientId + "&client_secret=" + this.clientSecret;

    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + authCode,
        "Content-Type": "application/json",
        "tppId": this.tppId,
        "originUserId": "50520218",
        "timeStamp": new Date().getTime().toString(),
        "journeyId": this.journeyId,
        "subscriptionId": subscriptionId
      }
    };

    return new Promise(resolve => {

      this.httpClient.get(url, httpOptions).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        // alert("getAccountDetails error: " + err.message);
      });
    });

    // return [
    //   {
    //     "bankId": "12345671",
    //     "accountId": "351012345671",
    //     "accountAlias": "ANDREAS",
    //     "accountType": "CURRENT",
    //     "accountName": "ANDREAS MICHAEL",
    //     "IBAN": "CY11002003510000000012345671",
    //     "currency": "EUR",
    //     "infoTimeStamp": "1511779237",
    //     "interestRate": 0,
    //     "maturityDate": "19/11/2018",
    //     "lastPaymentDate": "19/11/2017",
    //     "nextPaymentDate": "19/12/2017",
    //     "remainingInstallments": 10,
    //     "balances": []
    //   },
    //   {
    //     "bankId": "234567200",
    //     "accountId": "351092345672",
    //     "accountAlias": "DEMETRIS",
    //     "accountType": "CARD",
    //     "accountName": "DEMETRIS KOSTA",
    //     "IBAN": "CY960020035100000092345672",
    //     "currency": "EUR",
    //     "infoTimeStamp": "1511779237",
    //     "interestRate": 0,
    //     "maturityDate": "19/11/2018",
    //     "lastPaymentDate": "19/11/2017",
    //     "nextPaymentDate": "19/12/2017",
    //     "remainingInstallments": 10,
    //     "balances": []
    //   }
    // ];
  }


}