import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { SettingsService } from './settings.service';

@Injectable()
export class ResourceService {

  constructor(private _http: Http,
    private _authService: AuthenticationService,
    private _settings: SettingsService) { }

  public getValues(): Observable<string[]> {
    let url = this._settings.apiBaseUrl + 'values';

    return this._http.get(url,
      {
        headers: this._authService.createAuthHeaders(
          { 'Content-Type': 'application/json' }
        )
      }).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || this._settings.serverErrorMessage));
  }
}
