import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    declare const Pusher: any;
    @Injectable()
    export class PusherServiceProvider {
    channel;
    constructor(public http: HttpClient) {
    var pusher = new Pusher('123', {
    cluster: 'eu',
    encrypted: true,
    });
    this.channel = pusher.subscribe('item-channel');
    }
    public init(){
      return this.channel;
      }
    }