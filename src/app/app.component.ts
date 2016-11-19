import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { IUser } from './shared/models/common';
import { AuthenticationService } from './shared/services/authentication.service';
import { ResourceService } from './shared/services/resource.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loginForm: FormGroup;
  public name: FormControl;
  public password: FormControl;
  public user: IUser;
  public busy: boolean;
  public data: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _toastr: ToastsManager,
    private _authService: AuthenticationService,
    private _resourceService: ResourceService) {

    this.name = this._formBuilder.control('', Validators.required);
    this.password = this._formBuilder.control('', Validators.required);
    this.loginForm = this._formBuilder.group({
      'name': this.name,
      'password': this.password
    });

    this._authService.userChanged.subscribe((user: IUser) => {
      this.user = user;
    });
  }

  public login(group: FormGroup) {
    if (!this.loginForm.valid) {
      return;
    }

    this._authService.login(this.name.value, this.password.value);
  }

  public logout() {
    this._authService.logout();
  }

  public testApi() {
    if (!this.user) {
      return;
    }
    this._resourceService.getValues()
      .subscribe(
      (data: string[]) => {
        this.data = data.join(',');
      },
      error => {
        this._toastr.error(error);
        this.busy = false;
      },
      () => {
        this.busy = false;
      }
      );
  }
}
