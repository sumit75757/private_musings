import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { openDB } from 'idb';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddListComponent } from '../add-list/add-list.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  notes: any[] = []

  constructor(public dialog: MatDialog, private Router: Router, private spinner: NgxSpinnerService) {
    this.getlist()
    setTimeout(() => {
      this.spinner.hide()
    }, 600);
  }
  async getlist() {
    let arr: any[] = []
    const db1 = await openDB('db1', 1);
    db1.getAll('notes').then((res: any[]) => {
      console.log(res);
      db1.getAllKeys('notes').then((keys: any[]) => {
        console.log(keys);
        for (let index = 0; index < keys.length; index++) {
          const element = keys[index];
          const ress = res[index];
          ress.id = element
          this.notes.push(ress)

        }
      })


    })
  }
  openDialog(): void {
    // let enterAnimationDuration: string = '300ms'
    // let exitAnimationDuration: string = '100ms'
    // const dialogRef = this.dialog.open(AddListComponent, {
    //   width: '1000px',

    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    this.Router.navigate(['add'])

  }
  naviget(index: any) {
    console.log(index);

    this.Router.navigate(['add/' + index])

  }
  convert(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }
  async remove(i: any) {
    console.log(i);

    if (confirm("!REMOVE IT ?")) {
      this.spinner.show()
      const db1 = await openDB('db1', 1);
      db1.delete('notes', i + '').then((res: any) => {
        console.log();
        this.notes = res
        this.getlist()
      })
      setTimeout(() => {
        this.spinner.hide()
      }, 600);
    }
    else {
      this.getlist()

      return
    }

  }
}
