import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

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

}
