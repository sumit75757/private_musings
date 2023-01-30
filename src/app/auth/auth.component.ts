import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { openDB } from "idb";
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  hide = true;
  userinfo: any

  password: any
  constructor(private fb: FormBuilder, private route: Router, private spinner: NgxSpinnerService) {
    this.check_pass()
  }
  singin: FormGroup | any = this.fb.group({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  })
  getpass = false
  async submit() {

    const db1 = await openDB('db1', 1);
    db1.add('auth', this.singin.value, 'user').then(res => {
      console.log(res);
      this.route.navigate(['/'])
    }).catch(err => {
      console.log(err);

    })
  }

  async check_pass() {
    const db1 = await openDB('db1', 1);
    db1.getAll('auth').then((res: any) => {
      console.log(res);
      if (res.length == 0) {

        this.getpass = true
        this.userinfo = res[0]
      }
    }).catch(err => {
      this.getpass = false

    })
  }
  async subm() {
    const db1 = await openDB('db1', 1);
    db1.getAll('auth').then((res: any) => {
      if (this.password == res[0].password) {
        console.log(this.password == res[0].password);
        this.route.navigate(['/'])
        this.spinner.show()
      }

    }).catch(err => {
      this.getpass = false
    })
  }
}
