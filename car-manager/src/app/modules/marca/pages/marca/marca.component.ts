import { Component, OnInit, ViewChild } from '@angular/core';

import { Countries } from './../../../../core/utils/countries.enum';
import { BrandService } from './../../../../core/service/branch.service';
import { Brand } from 'src/app/core/model/Brand';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  @ViewChild('formCadastro', { static: false }) formCadastro: any;
  @ViewChild('formEdicao', { static: false }) formEdicao: any;

  brands: Array<any> = [];
  countries: Array<string> = [];
  brandEdit: Brand;

  displayModalEdicao: boolean;
  displayModalCadastro: boolean;

  constructor(private brandService: BrandService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.recuperarMarcas();
    this.brandEdit = new Brand();
  }

  recuperarPaises() {
    Object.keys(Countries).map((country) => {
      this.countries.push(Countries[country]);
    });
  }

  recuperarMarcas() {
    this.brandService.getBrands().subscribe(
      (resp) => {
        const data: any = resp;
        this.brands = data;
      },
      (err) => console.log(err)
    );
    this.recuperarPaises();
  }

  showModalDialog(brand: Brand) {
    Object.assign(this.brandEdit, brand);
    this.displayModalEdicao = true;
  }

  showModalDialogCadastro() {
    this.displayModalCadastro = true;
  }

  async onClickSalvarMarca() {
    const brand = this.formCadastro.form.value;
    await this.brandService.saveBrand(brand).toPromise().then(
      (data) => {
        this.displayModalCadastro = false;
        this.recuperarMarcas();
        this.formCadastro.reset();
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Marca '${brand.name}' cadastrada!`});
      }
    ).catch((error) => {
      this.displayModalCadastro = false;
      this.messageService.add({severity: 'error', summary: 'Erro ao cadastrar Marca', detail: error});
    });
  }

  async onClickExcluirMarca(brand: Brand) {
    this.confirmationService.confirm({
      message: `Confirmar a exclusão da marca ${brand.name} ? Isso pode implicar na exclusão de carros e modelos.`,
      accept: async () => {
        await this.brandService.deleteBrand(brand).toPromise().then(
          (resp) => {
            this.recuperarMarcas();
            this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Marca '${brand.name}' excluída!`});
          }
        ).catch((error) => {
          this.messageService.add({severity: 'error', summary: 'Erro ao excluir Marca', detail: error});
        });
      }
    });
  }

  async onClickEditarMarca() {
    await this.brandService.updateBrand(this.brandEdit).toPromise().then(
      (data) => {
        this.displayModalEdicao = false;
        this.recuperarMarcas();
        this.formEdicao.reset();
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: `Marca '${this.brandEdit.name}' alterada!`});
      }
    ).catch((error) => {
      this.displayModalEdicao = false;
      this.messageService.add({severity: 'error', summary: 'Erro ao editar Marca', detail: error});
    });
  }

}
