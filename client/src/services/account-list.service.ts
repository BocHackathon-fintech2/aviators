import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Account } from '../model/account.model';

@Injectable()
export class AccountListService {

  private accountListRef = this.db.list<Account>('account-list');

  constructor(private db: AngularFireDatabase) { }

  getAccountList() {
      return this.accountListRef
  }

  addAccount(account: Account) {
    return this.accountListRef.push(account);
  }

  updateAccount(account: Account) {
    return this.accountListRef.update(account.key, account);
  }

  removeAccount(account: Account) {
    return this.accountListRef.remove(account.key);
  }

  clearAccounts() {
    this.accountListRef.remove();
  }
}