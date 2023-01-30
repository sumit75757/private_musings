import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { openDB } from 'idb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private route: Router) {
    openDB('db1', 1, {
      upgrade(db) {
        db.createObjectStore('notes');
        db.createObjectStore('auth');

      },
    });
    this.getauth()

  }
  async getauth() {
    const db1 = await openDB('db1', 1);
    db1.getAll('auth').then((res: any[]) => {
      console.log(res);
      if (!res[0]) {
        this.route.navigate(['/auth'])
      }
      else {
        this.route.navigate(['/auth'])
      }
    })
  }

}
