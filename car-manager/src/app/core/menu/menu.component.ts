import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/modules/login/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService) { }

  items: MenuItem[];

  ngOnInit() {
      this.items = [
          {
              label: 'Veículo',
              icon: 'pi pi-fw pi-pencil',
              routerLink: ['/veiculos']
          },
          {
              label: 'Marca',
              icon: 'pi pi-fw pi-pencil',
              routerLink: ['/marcas']
          },
          {
            label: 'Modelo',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/modelos']
          }
      ];
  }

  onClickLogout() {
    this.authService.logout();
  }

}
