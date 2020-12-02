import { Component, OnInit, ViewChild } from '@angular/core';

import { ModelService } from './../../../../core/service/model.service';
import { BranchService } from './../../../../core/service/branch.service';
import { Branch } from 'src/app/core/model/Branch';
import { Model } from 'src/app/core/model/Model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css'],
  providers: [ MessageService ]
})
export class ModeloComponent implements OnInit {

  @ViewChild('formCadastroModelo', { static: false }) formCadastroModelo: any;
  @ViewChild('formEdicaoModelo', { static: false }) formEdicaoModelo: any;

  branches: Array<Branch> = [];
  branchSelected: Branch;
  modelEdit: Model;
  modelos: Array<Model> = [];
  displayModal: boolean;
  displayModalEdit: boolean;

  constructor(private branchService: BranchService,
              private modelService: ModelService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.branchSelected = new Branch();
    this.modelEdit = new Model();
    this.recuperarMarcas();
  }

  async recuperarMarcas() {
    this.branchService.getBrachs().toPromise().then(
      (resp) => {
        const data: any = resp;
        this.branches = data;
      }
    ).catch((err) => {
      alert(err.error.message)
    });
  }

  async onClickBranch(branch: Branch) {
    Object.assign(this.branchSelected, branch);
    await this.modelService.getModelsByBranch(branch).toPromise().then(
      (resp) => {
        const data: any = resp;
        this.modelos = data;
      }
    ).catch((err) => {
      alert(err.error.message)
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
    this.modelService.saveModel(this.branchSelected, model).subscribe(
      (resp) => {
        this.displayModal = false;
        this.formCadastroModelo.reset();
        this.onClickBranch(this.branchSelected);
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `${model.name} cadastrado!`});
      },
      (err) => alert(err.error.message)
    );
  }

  onClickEditarModelo(modelo: Model) {
    Object.assign(this.modelEdit, modelo);
    this.displayModalEdit = true;
  }

  onConfirmEditarModelo() {
    this.modelService.editModel(this.branchSelected, this.modelEdit).subscribe(
      (resp) => {
        const modeloNome: string = this.modelEdit.name;
        this.displayModalEdit = false;
        this.formEdicaoModelo.reset();
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `${modeloNome} editado!`});
        this.recuperarMarcas();
      },
      (err) => {
        alert(err.error.message)
      }
    );
  }

  onClickExcluirModelo(modelo: Model) {
    this.confirmationService.confirm({
      message: `Deseja confirmar a exclusão do modelo '${modelo.name}'`,
      accept: () => {
        this.excluirModelo(modelo);
      }
    });
  }

  excluirModelo(modelo: Model) {
    this.modelService.deleteModel(this.branchSelected, modelo).subscribe(
      (resp) => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `${modelo.name} excluído!`});
        this.onClickBranch(this.branchSelected);
      },
      (err) => alert(err.error.message)
    );
  }

}
