import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  branchs: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.branchs = [
      {
        id_branch: 2,
        name: 'BMW',
        country: 'GERMANY'
      },
      {
        id_branch: 3,
        name: 'AUDI',
        country: 'GERMANY'
      },
      {
        id_branch: 4,
        name: 'FIAT',
        country: 'ITALY'
      },
      {
        id_branch: 5,
        name: 'FORD',
        country: 'USA'
      },
      {
        id_branch: 6,
        name: 'CHEVROLET',
        country: 'USA'
      },
      {
        id_branch: 7,
        name: 'RENAULT',
        country: 'FRANCE'
      },
      {
        id_branch: 8,
        name: 'PEUGEOT',
        country: 'FRANCE'
      },
      {
        id_branch: 9,
        name: 'CITROEN',
        country: 'FRANCE'
      },
      {
        id_branch: 10,
        name: 'HONDA',
        country: 'JAPAN'
      },
      {
        id_branch: 11,
        name: 'HYUNDAI',
        country: 'SOUTH COREA'
      },
      {
        id_branch: 12,
        name: 'LAND HOVER',
        country: 'UNITED KINGDON'
      },
      {
        id_branch: 13,
        name: 'VOLVO',
        country: 'SWEDEN'
      },
      {
        id_branch: 14,
        name: 'MITSUBISHI',
        country: 'JAPAN'
      },
      {
        id_branch: 15,
        name: 'TOYOTA',
        country: 'JAPAN'
      },
      {
        id_branch: 19,
        name: 'VOLKSWAGEN',
        country: 'GERMANY'
      }
    ];
  }

}
