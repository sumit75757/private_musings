import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild('sidenav') public sidenav: MatSidenav | any;

  constructor(private sideNavService: CommonService, private route: Router) {
  }
  showFiller = false;
  // ngOnInit() {
  //   this.sideNavService.sideNavToggleSubject.subscribe(() => {
  //     this.sidenav.toggle();
  //   });
  // }
  setcolor(e: any) {
    console.log(e.target.value);
  }
  nav() {
    this.route.navigate(["auth"])
  }
}
