import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faBars, faCircleInfo, faMoon, faSun, faUsers } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterLink, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faMoon = faMoon;
  faSun = faSun;
  faMenu = faBars;
  faUsers = faUsers;
  faInfo = faCircleInfo;
  faSkip = faArrowLeft;
  activeMenuBoolean = false;
  modalActivado = false;
  darkTheme: boolean = false;
  
  themeMode(){
    this.darkTheme = !this.darkTheme;
    if(this.darkTheme){
      document.body.classList.add('darkMode');
    }else{
      document.body.classList.remove('darkMode');
    }
  }

  showMenuMobile(){
    this.modalActivado = true;
    this.activeMenuBoolean = !this.activeMenuBoolean;
  }

}
