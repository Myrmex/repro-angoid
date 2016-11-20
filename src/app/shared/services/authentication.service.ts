import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SettingsService } from './settings.service';
import { LocalStorageService } from './local-storage.service';
import { IUser } from '../models/common';

interface ITokenResult {
    token_type: string;
    access_token: string;
    refresh_token: string;
    expires_in: string;
    scope: string;
    // this value is calculated
    expires_on?: Date;
}

interface IUserInfoResult {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    email: string;
    email_verified: boolean;
    roles: string;
}

@Injectable()
export class AuthenticationService {
    public userChanged: EventEmitter<IUser>;

    constructor(
        private _http: Http,
        private _settings: SettingsService,
        private _localStorage: LocalStorageService) {
        this.userChanged = new EventEmitter<IUser>();
    }

    /**
     * Logs the specified user in.
     * @param {string} name: user name.
     * @param {string} password: password.
     */
    public login(name: string, password: string) {
        if (!name) {
            throw new Error('User name not specified');
        }

        let body = 'grant_type=password&scope=offline_access profile email roles' +
            `&resource=${this._settings.appBaseUrl}&username=${name}&password=${password}`;

        this._http.post(
            this._settings.authBaseUrl + `token`,
            body,
            {
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).map(res => res.json())
            .subscribe(
            (token: ITokenResult) => {
                // calculate expiry date and save result
                if (token.expires_in) {
                    token.expires_on = this.calculateExpirationDate(+token.expires_in);
                }
                this._localStorage.store(this._settings.tokenStorageKey, token, true);
                // get user info
                this._http.get(this._settings.authBaseUrl + 'userinfo', {
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token.access_token
                    })
                }).map(res => res.json())
                  .subscribe((info: IUserInfoResult) => {
                        let user: IUser = {
                            id: info.name,
                            email: info.email,
                            name: info.name,
                            firstName: info.given_name,
                            lastName: info.family_name,
                            // currently each user has a single role, so just pick it
                            role: info.roles,
                            verified: info.email_verified
                        };
                        // save result
                        this._localStorage.store(this._settings.userStorageKey, user, true);
                        this.userChanged.emit(user);
                    }, error => {
                        console.log('AuthenticationService: error getting user info');
                    });
            },
            error => {
                console.log('AuthenticationService: error getting access token');
            });
    }

    /**
     * Logs out the current user if any.
     */
    public logout() {
        this._localStorage.remove(this._settings.userStorageKey, true);
        this._localStorage.remove('id_token');
        this.userChanged.emit(null);
        let options = {
            headers: this.createAuthHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.get(this._settings.authBaseUrl + 'logout', options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || this._settings.serverErrorMessage));
    }

    /**
     * True it the user is authenticated, and eventually verified.
     * @param {boolean} verifiedOnly true to return true only if the user is verified.
     * @returns {boolean} true if authenticated (and eventually verified).
     */
    public isAuthenticated(verifiedOnly: boolean) {
        // check stored data
        let result: ITokenResult = this._localStorage.retrieve(this._settings.tokenStorageKey, true);
        if (!result) {
            return false;
        }

        // check expiration
        if (result.expires_on) {
            if (this.getUTCDate().valueOf() - result.expires_on.valueOf() < 60) {
                return false;
            }
        }

        // check confirmation, if requested
        if (!verifiedOnly) {
            return true;
        }
        let user: IUser = this._localStorage.retrieve(this._settings.userStorageKey, true);
        return user && user.verified;
    }

    /**
     * Gets data about the current user.
     * @returns {IUser} user data or null.
     */
    public getCurrentUser(): IUser {
        return this._localStorage.retrieve(this._settings.userStorageKey, true);
    }

    /**
     * Create headers with bearer authentication. You can use this method as a shortcut
     * for building headers for authenticated requests.
     * @param {{[name: string]: any}} headers content of headers to be merged
     * with the authentication headers.
     * @returns {Headers} headers.
     */
    public createAuthHeaders(headers?: { [name: string]: any }): Headers {
        // create headers
        let auth = new Headers();
        if (headers) {
            for (let key in headers) {
                if (headers.hasOwnProperty(key)) {
                    auth.append(key, headers[key]);
                }
            }
        }

        // append authentication
        let tokenResult: ITokenResult = this._localStorage.retrieve(this._settings.tokenStorageKey, true);
        if (tokenResult) {
            auth.append('Authorization', 'Bearer ' + tokenResult.access_token);
        }
        return auth;
    }

    private getUTCDate(date?: Date): Date {
        if (!date) {
            date = new Date();
        }
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }

    private calculateExpirationDate(exp: number): Date {
        let date = this.getUTCDate();
        date.setSeconds(date.getUTCSeconds() + exp);
        return date;
    }
}
