import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { openDB } from "idb";
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent {
  id: any
  constructor(private fb: FormBuilder, private ar: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) {
    ar.params.subscribe((res: any) => {
      this.id = res.id
      this.getbyid(this.id)
    })
  }


  notes: FormGroup | any = this.fb.group({
    title: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required]),
    nots: new FormControl("", [Validators.required]),
  })


  async getbyid(id: any) {
    const db1 = await openDB('db1', 1);

    db1.get('notes', id).then((res: any[]) => {
      console.log(res);
      this.notes.patchValue(res)

      // for (let index = 0; index < res.length; index++) {
      //   const element = res[index];
      //   if (id == index) {
      //     console.log(element);
      //   }
      // }

    })
  }

  async submit() {
    console.log(this.notes.value);
    this.spinner.show()

    if (!this.id) {
      const db1 = await openDB('db1', 1);
      db1.getAllKeys('notes').then((res: any[]) => {
        console.log(res.length)
        db1.add('notes', this.notes.value, Math.floor(Math.random() * 10000000000000) + '').then(res => {
          console.log(res);
          this.router.navigate(["/list"])

        }).catch(err => {
          setTimeout(() => {
            this.spinner.hide()
          }, 600);
          console.log(err);

        });
      })
      // db1.close()
    } else {
      const db1 = await openDB('db1', 1);

      db1.put('notes', this.notes.value, this.id + '').then(res => {
        console.log(res);

        this.router.navigate(["/list"])

      }).catch(err => {
        console.log(err);

        this.router.navigate(["/list"])

      });
      // db1.close()

    }

  }
}
