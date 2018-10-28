import { Component, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../services/auth.service';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loginForm: FormGroup;
	loginError: string;

	constructor(
	 private navCtrl: NavController,
	 private auth: AuthService,
		fb: FormBuilder
	) {
		this.loginForm = fb.group({
			email: ['panayiotis.s.constantinou@gmail.com', Validators.compose([Validators.required, Validators.email])],
			password: ['123456', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }
  
  login() {
		let data = this.loginForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		
		this.auth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot(TabsPage),
				error => this.loginError = error.message
			);
}

signup(){
  this.navCtrl.push(SignupPage);
}

}