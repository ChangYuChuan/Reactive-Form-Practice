import { Component, OnInit, VERSION } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}
  fname: FormControl;
  lname: FormControl;
  eaddress: FormControl;
  phone: FormControl;
  info: FormControl;
  preference: FormControl;
  SessionForm: FormGroup;

  ngOnInit(): void {
    this.fname = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+'),
    ]);
    this.lname = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+'),
    ]);
    this.eaddress = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
      this.invalidEmail(['yahoo', 'pchome']),
    ]);
    this.phone = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]);
    this.info = new FormControl('', Validators.required);
    this.preference = new FormControl('', Validators.required);
    this.SessionForm = new FormGroup({
      fname: this.fname,
      lname: this.lname,
      eaddress: this.eaddress,
      phone: this.phone,
      info: this.info,
      preference: this.preference,
    });
  }
  name = 'Angular ' + VERSION.major;
  saveSession(formValue): void {
    console.log('info:', formValue);
  }

  invalidEmail(orgs: string[]): any {
    return (control: FormControl) => {
      if (!control.value) return null;
      let atOrgs: string[] = orgs.map((element) => `@${element}`);
      let regexp = new RegExp(atOrgs.join('|'));
      if (regexp.test(control.value)) {
        return { invalidEmail: 'Email address is not support' };
      }
      return null;
    };
  }
}
