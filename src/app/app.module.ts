import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {HttpClientModule} from "@angular/common/http";
import {LocalStorage} from "../services/localStorage.service";
import {HttpService} from "../services/http.service";
import {vendorModules} from "./vendor.modules";
import {SharedService} from "../services/shared.service";
import {scrollToFactory} from "../services/scroll-to.factory";
import {DirectiveModule} from "./directive.modules";
import {RestorePasswordView} from "./restore-password/restore-password-view";
import {RegistrationView} from "./registration/registration-view";
import {UAService} from "../services/user-agent.service";
import {AuthGuard} from "../services/auth-guard.service";
import {SuppliersView} from "./suppliers/suppliers.component";
import {HttpClient} from "@angular/common/http";
import {SupplierView} from "./supplier/supplier.component";
import {LoginView} from "./login/login.component";
import {ProfileView} from "./profile/profile.component";
import {TranslateService} from "@ngx-translate/core";
import {soccer} from "../locales/soccer";
import {crimea} from "../locales/crimea";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestorePasswordView,
    RegistrationView,
    SuppliersView,
    SupplierView,
    LoginView,
    ProfileView,
  ],
  imports: [
    vendorModules,
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(<any>[
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'restore-password', component: RestorePasswordView, pathMatch: 'full'},
      { path: 'registration', component: RegistrationView, pathMatch: 'full'},
      { path: 'suppliers', component: SuppliersView, pathMatch: 'full'},
      { path: 'supplier', component: SupplierView, pathMatch: 'full'},
      { path: 'login', component: LoginView, pathMatch: 'full'},
      { path: 'profile', component: ProfileView, pathMatch: 'full'},

        // AuthGuard
      { path: 'geo', loadChildren: './geo/geo.module#GeoModule', canActivate: [AuthGuard], canLoad: [AuthGuard]},
    ]),
    HttpClientModule,
    TransferHttpCacheModule,
    DirectiveModule

  ],
  providers: [
    SharedService,
    LocalStorage,
    HttpService,
    UAService,
    AuthGuard,
    {provide: 'phoneMask', useValue: '+7(000)000-0000'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(translate: TranslateService) {
    translate.setDefaultLang('soccer');
    translate.setTranslation('soccer', soccer);
    translate.setTranslation('crimea', crimea);
    translate.use('soccer');
  }
}
