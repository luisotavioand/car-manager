import { ModelService } from './../../../../core/service/model.service';
import { BrandService } from './../../../../core/service/branch.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { CarService } from './../../../../core/service/car.service';
import { Car } from 'src/app/core/model/Car';
import { Brand } from 'src/app/core/model/Brand';
import { Model } from 'src/app/core/model/Model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit {

  @ViewChild('formCadastroCarro', { static: false }) formCadastroCarro: any;
  @ViewChild('formEdicaoCarro', { static: false }) formEdicaoCarro: any;

  carros: Array<Car> = [];
  marcas: Array<Brand> = [];
  modelos: Array<Model> = [];
  carroEdicao: Car;

  displayModalCadastro: boolean;
  displayModalEdicao: boolean;

  constructor(private carService: CarService,
              private confirmationService: ConfirmationService,
              private brandService: BrandService,
              private modelService: ModelService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.carroEdicao = new Car();
    this.recuperarCarros();
    this.recuperarMarcas();
  }

  recuperarCarros() {
    this.carService.getCars().subscribe(
      (resp) => {
        const data: any = resp;
        this.carros = data;
      },
      (err) => { this.messageService.add({severity: 'error', summary: 'Erro ao Recuperar Carros', detail: `${err}`}); }
    );
  }

  recuperarMarcas() {
    this.brandService.getBrands().subscribe(
      (resp) => {
        const data: any = resp;
        this.marcas = data;
      },
      (err) => { this.messageService.add({severity: 'error', summary: 'Erro ao Recuperar Marcas', detail: `${err}`}); }
    );
  }

  recuperarModelos(brand: Brand) {
    this.modelService.getModelsByBrand(brand).subscribe(
      (resp) => {
        const data: any = resp;
        this.modelos = data;
      },
      (err) => { this.messageService.add({severity: 'error', summary: 'Erro ao Recuperar Modelos', detail: `${err}`}); }
    );
  }

  onChangeMarca(idMarca: string) {
    const marca: any = this.marcas.filter((item) => {
      if (item.id_brand.toString() === idMarca) {
        return item;
      }
    });
    this.recuperarModelos(marca[0]);
  }

  onClickCadastrarCarro() {
    const car: Car = new Car();
    Object.assign(car, this.formCadastroCarro.form.value);
    this.cadastrarCarro(car);
  }

  onClickExcluirCarro(car: Car) {
    this.confirmationService.confirm({
      message: `Confirmar a exclusão do Carro ?`,
      accept: async () => {
        this.excluirCarro(car);
      }
    });
  }

  onClickEditarCarro(car: Car) {
    Object.assign(this.carroEdicao, car);
    const brand: Brand = new Brand();
    brand.id_brand = car.brand_id;
    this.recuperarModelos(brand);
    this.displayModalEdicao = true;
  }

  cadastrarCarro(car: Car) {
    // tslint:disable-next-line: radix
    car.model_id = parseInt(car.model_id.toString());
    this.carService.saveCar(car).subscribe(
      (resp) => {
        const carSaved: Car = new Car();
        Object.assign(carSaved, resp);
        this.displayModalCadastro = false;
        this.carros.push(carSaved);
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Carro cadastrado!`});
        this.formCadastroCarro.reset();
      },
      (err) => {
        this.displayModalCadastro = false;
        this.messageService.add({severity: 'error', summary: 'Erro ao Cadastrar Carro', detail: `${err}`}); }
    );
  }

  editarCarro() {
    // tslint:disable-next-line: radix
    this.carroEdicao.model_id = parseInt(this.carroEdicao.model_id.toString());
    this.carService.updateCar(this.carroEdicao).subscribe(
      (resp) => {
        this.displayModalEdicao = false;
        this.recuperarCarros();
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Carro alterado!`});
      },
      (err) => {
        this.displayModalEdicao = false;
        this.messageService.add({severity: 'error', summary: 'Erro ao Alterar Carro', detail: `${err}`}); }
    );
  }

  excluirCarro(car: Car) {
    this.carService.deleteCar(car).subscribe(
      (resp) => {
       this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Carro excluído!`});
       this.recuperarCarros();
      },
      (err) => { this.messageService.add({severity: 'error', summary: 'Erro ao Excluir Carro', detail: `${err}`}); }
    );
  }

}
