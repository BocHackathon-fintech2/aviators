import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, Headers } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BocService {

  clientId: String
  clientSecret: String
  url: String
  tppId: String
  journeyId: String
  accessToken: String

  constructor(public httpClient: HttpClient) {
    this.clientId = "417a0214-314c-4cb1-8e2b-71c948840fb5";
    this.clientSecret = "eH0nK1vS7qU6hW7aP0bJ6jR8cY3jP3gS5oS4bS5eA1nF8uQ8eA";
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

  createSubscription(oauthCode) {

    const httpOptions = {
      headers: {
        "Authorization": "Bearer " + oauthCode,
        "Content-Type": "application/json",
        "APIm-Debug-Trans-Id": true,
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
    var url = this.url + "/oauth2/authorize?response_type=code&redirect_uri=https://stark-lowlands-94641.herokuapp.com/bocredirect&scope=UserOAuth2Security&subscriptionid=" + subscriptionId + "&client_id=" + this.client_id;

    
  }


}