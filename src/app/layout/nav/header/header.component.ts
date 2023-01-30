import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() data: any;
  constructor(private sideNavService: CommonService) {

  }
  clickMenu() {
    this.sideNavService.toggle();
  }
}
