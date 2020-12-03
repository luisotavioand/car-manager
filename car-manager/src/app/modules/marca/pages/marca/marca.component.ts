import { Countries } from './../../../../core/utils/countries.enum';
import { BranchService } from './../../../../core/service/branch.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Branch } from 'src/app/core/model/Branch';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  @ViewChild('form', { static: false }) form: any;
  @ViewChild('form', { static: false }) formEdicao: any;

  branchs: Array<any> = [];
  countries: Array<string> = [];
  branchEdit: Branch;

  displayModal: boolean;
  displayModalCadastro: boolean;

  constructor(private branchService: BranchService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.recuperarMarcas();
    this.branchEdit = new Branch();
  }

  recuperarPaises() {
    Object.keys(Countries).map((country) => {
      this.countries.push(Countries[country]);
    });
  }

  recuperarMarcas() {
    this.branchService.getBrachs().subscribe(
      (resp) => {
        const data: any = resp;
        this.branchs = data;
      },
      (err) => console.log(err)
    );
    this.recuperarPaises();
  }

  showModalDialog(branch: Branch) {
    Object.assign(this.branchEdit, branch);
    this.displayModal = true;
  }

  showModalDialogCadastro() {
    this.displayModalCadastro = true;
  }

  async onClickSalvarMarca() {
    const branch = this.form.form.value;
    await this.branchService.saveBranch(branch).toPromise().then(
      (data) => {
        this.displayModalCadastro = false;
        this.recuperarMarcas();
      }
    ).catch((error) => {
      console.log(error);
    });
  }

  async onClickExcluirMarca(branch: Branch) {
    this.confirmationService.confirm({
      message: `Confirmar a exclusão da marca ${branch.name} ?`,
      accept: async () => {
        await this.branchService.deleteBranch(branch).toPromise().then(
          (resp) => {
            this.recuperarMarcas();
          }
        ).catch((error) => {
          console.log(error);
        });
      }
    });
  }

  async onClickEditarMarca() {
    await this.branchService.updateBranch(this.branchEdit).toPromise().then(
      (data) => {
        this.displayModal = false;
        this.recuperarMarcas();
      }
    ).catch((error) => {
      console.log(error);
    });
  }

}
