/**
 * Created by ozknemoy on 15.01.2017.
 * директивы и компоненты. ангулара, сторонние и мои
 * этот модуль должен наследовать каждый модуль приложения
 *
 */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {vendorModules} from './vendor.modules';
import {LoginModalComponent} from "../modals/login-modal/login-modal";
import {HrefDirective, HrefExtDirective} from "../directives/href.directive";
import {BlurFocusDirective} from "../directives/blur-focus.directive";
import {OuterHref} from "../directives/outer-href.directive";
import {loginModalButtonDirective} from "../modals/login-modal/login-modal.directive";
import {MapViewComponent} from "../directives/map-view.component";
import {QrBarcodeButtonomponent} from "../modals/qr-barcode-button/qr-barcode-button.directive";
import {QrBarcodeButtonModal} from "../modals/qr-barcode-button/qr-barcode-button.modal";
import {NavHeaderComponent} from "../directives/nav-header/nav-header.component";
import {AppFooterComponent} from "../directives/app-footer/app-footer.component";
import {AddClassAfterScrollDirective} from "../directives/add-class-after-scroll.directive";
import {ArenasportHomeComponent, CrimeaHomeComponent} from "./home/home.component";
import {PartnerCardComponent} from "../directives/partner-card.component";
import {ForPartnersButtonDirective} from "../modals/for-partners-button/for-partners-button.directive";
import {ForPartnersButtonModal} from "../modals/for-partners-button/for-partners-button.modal";


export const vendorDirectiveModules = [
  //FileUploadModule,
];

const __modals__ = [
  LoginModalComponent,
  QrBarcodeButtonModal,
  ForPartnersButtonModal,
];
export const routelessComponents = [
  //OuterHrefModalComponent,
  //OuterHrefDirective,
  OuterHref,
  BlurFocusDirective,
  loginModalButtonDirective,
  HrefDirective,
  HrefExtDirective,
  MapViewComponent,
  QrBarcodeButtonomponent,
  NavHeaderComponent,
  AppFooterComponent,
  AddClassAfterScrollDirective,
  ArenasportHomeComponent,
  CrimeaHomeComponent,
  PartnerCardComponent,
  ForPartnersButtonDirective,
  //FileUploaderComponent,
  //OzkNumberDirective,
  //ScrollDirective

];

@NgModule({
  imports: [RouterModule, CommonModule, FormsModule, vendorDirectiveModules, vendorModules],
  declarations: [routelessComponents, __modals__,],
  exports: [routelessComponents, vendorDirectiveModules, CommonModule, FormsModule],
  // IMPORTANT:
  // динамические компоненты
  // Since modals is never explicitly used (in a template)
  // we must tell angular about it.
  entryComponents: [__modals__]
})
export class DirectiveModule {
}