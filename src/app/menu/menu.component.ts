import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faBars, faCircleInfo, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
    faUsers = faUsers;
    faInfo = faCircleInfo;
    faMenu = faBars;

    constructor(private route: Router){}


}
