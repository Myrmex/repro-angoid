import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { ResourceService } from './shared/services/resource.service';
import { SettingsService } from './shared/services/settings.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ToastModule
  ],
  providers: [
    AuthenticationService,
    LocalStorageService,
    ResourceService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
