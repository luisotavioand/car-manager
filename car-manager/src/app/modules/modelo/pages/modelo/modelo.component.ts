import { Component, OnInit, ViewChild } from '@angular/core';

import { ModelService } from './../../../../core/service/model.service';
import { BrandService } from './../../../../core/service/branch.service';
import { Brand } from 'src/app/core/model/Brand';
import { Model } from 'src/app/core/model/Model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css'],
  providers: [ MessageService ]
})
export class ModeloComponent implements OnInit {

  @ViewChild('formCadastroModelo', { static: false }) formCadastroModelo: any;
  @ViewChild('formEdicaoModelo', { static: false }) formEdicaoModelo: any;

  brands: Array<Brand> = [];
  brandSelected: Brand;
  modelEdit: Model;
  models: Array<Model> = [];
  displayModal: boolean;
  displayModalEdit: boolean;

  constructor(private brandService: BrandService,
              private modelService: ModelService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.brandSelected = new Brand();
    this.modelEdit = new Model();
    this.recuperarMarcas();
  }

  async recuperarMarcas() {
    this.brandService.getBrands().toPromise().then(
      (resp) => {
        const data: any = resp;
        this.brands = data;
      }
    ).catch((err) => {
      this.messageService.add({severity: 'error', summary: 'Erro ao Recuperar Marcas', detail: `${err}`});
    });
  }

  async onClickBranch(brand: Brand) {
    Object.assign(this.brandSelected, brand);
    await this.modelService.getModelsByBrand(brand).toPromise().then(
      (resp) => {
        const data: any = resp;
        this.models = data;
      }
    ).catch((err) => {
      this.messageService.add({severity: 'error', summary: 'Erro ao Recuperar Modelos', detail: `${err}`});
    });
  }

  onClickNext() {
    const selector = document.getElementById('branch-selector');
    selector.scrollBy(-100, 0);
  }

  onClickBack() {
    const selector = document.getElementById('branch-selector');
    selector.scrollBy(100, 0);
  }

  async onClickCadastrarModelo() {
    const model: Model = this.formCadastroModelo.form.value;
    this.modelService.saveModel(this.brandSelected, model).subscribe(
      (resp) => {
        this.displayModal = false;
        this.formCadastroModelo.reset();
        this.onClickBranch(this.brandSelected);
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `${model.name} cadastrado!`});
      },
      (err) => {
        this.displayModal = false;
        this.messageService.add({severity: 'error', summary: 'Erro ao Cadastrar modelo', detail: `${err}`});
      }
    );
  }

  onClickEditarModelo(modelo: Model) {
    Object.assign(this.modelEdit, modelo);
    this.displayModalEdit = true;
  }

  onConfirmEditarModelo() {
    this.modelService.editModel(this.brandSelected, this.modelEdit).subscribe(
      (resp) => {
        const modeloNome: string = this.modelEdit.name;
        this.displayModalEdit = false;
        this.formEdicaoModelo.reset();
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `${modeloNome} editado!`});
        this.onClickBranch(this.brandSelected);
      },
      (err) => {
        this.displayModalEdit = false;
        this.formEdicaoModelo.reset();
        this.messageService.add({severity: 'error', summary: 'Erro ao Editar modelo', detail: `${err}`});
      }
    );
  }

  onClickExcluirModelo(modelo: Model) {
    this.confirmationService.confirm({
      message: `Deseja confirmar a exclusão do modelo '${modelo.name}' ?. Isso pode implicar na exclusão de carros.`,
      accept: () => {
        this.excluirModelo(modelo);
      }
    });
  }

  excluirModelo(modelo: Model) {
    this.modelService.deleteModel(this.brandSelected, modelo).subscribe(
      (resp) => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `${modelo.name} excluído!`});
        this.onClickBranch(this.brandSelected);
      },
      (err) => this.messageService.add({severity: 'error', summary: 'Erro ao Excluir modelo', detail: `${err}`})
    );
  }

}
