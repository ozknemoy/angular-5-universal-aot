import {Component,ViewChild,Inject} from "@angular/core";
import {ReCaptchaComponent} from "angular2-recaptcha";
import {ActivatedRoute} from "@angular/router";
import {LocalStorage} from "../../services/localStorage.service";
import {Router} from "@angular/router";
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {UAService} from "../../services/user-agent.service";
import {Meta,Title} from "@angular/platform-browser";
import {TITLE} from '../../config/small.configs'
import {HttpService} from "../../services/http.service";
import {SharedService} from "../../services/shared.service";

export function isEqualValidPassword(stepOneModel):boolean {
  return stepOneModel.password && stepOneModel.password.valid
    && stepOneModel.passwordTwo.value === stepOneModel.password.value
}



@Component({
  selector: 'registration-view',
  templateUrl: './registration-view.html'
})
@AutoUnsubscribe()
export class RegistrationView {
  public stepOneModel = {
    phone: null,
    password: null,
    passwordTwo: null,
    code: null,
    card_number: null,
  };
  private login$$;
  public step:'one' | 'two' | 'three' = 'one';
  public showPass = false;

  constructor(
    public httpService:HttpService,
    private metaService: Meta,
    private titleService: Title,
    @Inject('phoneMask') public phoneMask: string
  ) {}

  ngOnInit() {
    //https://netbasal.com/exploring-the-new-meta-service-in-angular-version-4-b5ba2403d3e6
    this.metaService.addTags([
      {name: 'twitter:title', content: 'Регистрация'},
      {property: 'og:title', content: 'Регистрация'}
    ]);
    this.titleService.setTitle('Регистрация');

  }

  isEqualValidPassword(stepOneForm):boolean {
    return isEqualValidPassword(stepOneForm.controls)
  }

  toStepTwo() {
    this.httpService.getSms(this.stepOneModel.phone).subscribe(
      d => this.step = 'two',
      err => {}
    )
  }

  toStepThree(sms:string) {
    this.httpService.get(
      `users/check-confirm-code?code=${sms}&phone=${this.stepOneModel.phone}`
    ).subscribe(
      d => this.step = 'three',
      err => {}
    )
  }

  signup(withExistedCard:boolean) {
    //если card_number нет, то создастся новая карта
    if (!withExistedCard) this.stepOneModel.card_number = null;
    this.httpService.postWithToast(
      'users/registration',
      {RegistrationForm: this.stepOneModel},
      'Вы успешно зарегистрировались.',
      10e3
    ).subscribe(
      d => {
        // сразу же логин. не обрабатываю провал тк данные верные
        this.login$$ = this.httpService.login({
          phone: this.stepOneModel.phone,
          password: this.stepOneModel.password
        }).subscribe(d => {})
    }, err => {}
    )
  }

  ngOnDestroy() {
    this.metaService.removeTag("name='og:title'");
    this.metaService.removeTag("name='twitter:title'");
    this.titleService.setTitle(TITLE);
  }
}