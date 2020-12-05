import { NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/modules/login/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  items: MenuItem[];
  visible: boolean;

  ngOnInit() {
      const username: string = localStorage.getItem('getCarU');
      this.items = [
          {
            label: `${username}`,
            icon: 'pi pi-fw pi-user',
            disabled: true
          },
          {
              label: 'Home',
              icon: 'pi pi-fw pi-home',
              routerLink: ['/home'],
          },
          {
              label: 'Carros',
              icon: 'pi pi-fw pi-th-large',
              routerLink: ['/carros']
          },
          {
              label: 'Marca',
              icon: 'pi pi-fw pi-shield',
              routerLink: ['/marcas']
          },
          {
            label: 'Modelo',
            icon: 'pi pi-fw pi-table',
            routerLink: ['/modelos']
          }
      ];
      this.router.events.subscribe(
        (event: any) => {
          const url: string = this.router.url.toString();
          if (url === '/login') {
            this.visible = true;
          } else {
            this.visible = false;
          }
        }
      );
  }

  onClickLogout() {
    this.authService.logout();
  }

}
