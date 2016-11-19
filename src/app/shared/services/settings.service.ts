import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class SettingsService {
  public apiBaseUrl: string;
  public authBaseUrl: string;
  public appBaseUrl: string;
  public serverErrorMessage: string;
  public userStorageKey: string;  // stores IUser
  public tokenStorageKey: string; // stores ITokenResult

  constructor() {
    if (environment.production) {
      // TODO: set your production URLs here
    } else {
      this.apiBaseUrl = 'http://localhost:50728/api/';
      this.authBaseUrl = 'http://localhost:50728/connect/';
      this.appBaseUrl = 'http://localhost:4200/';
    }
    this.serverErrorMessage = 'Server error';
    this.userStorageKey = 'angoid-ls-user';
    this.tokenStorageKey = 'angoid-ls-token';
  }
}
