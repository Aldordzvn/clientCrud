import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faBars, faCircleExclamation, faMoon, faSun, faUserMinus, faUserPen, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ICliente } from '../models/cliente.model';
import { CrudService } from '../services/crud.service';
import { map, Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-clientes',
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {
  faMoon = faMoon;
  faSun = faSun;
  faUser = faUserPlus;
  faCancel = faXmark;
  faMenu = faBars;
  faEdit = faUserPen;
  faDelete = faUserMinus;
  closeBoolean: boolean = false;
  errorFlag: boolean = false;
  clientesArray$: Observable<ICliente[]>
  editandoId: string | null = null;
  faWarning = faCircleExclamation;
  modalDeleteBoolean: boolean = false;
  idDelete: string | null = null;
  pageDesktop: number = 1;
  pageMobile: number = 1;
  
  constructor(private crud: CrudService) {
    this.clientesArray$ = this.crud.clientes$;
  }

  // ngOnInit() {
  //   this.crud.loadClientes.subscribe(data=> this.clientesArray = data);
  // }
  noScroll(){
    if(this.closeBoolean || this.modalDeleteBoolean){
      document.body.classList.add('no-scroll');
    }else{
      document.body.classList.remove('no-scroll');
    }
  }

  showForm() {
    this.closeBoolean = !this.closeBoolean;
    this.limpiarFormulario(this.formCliente);
    this.noScroll();
  }

  showDeleteModal(id: string) {
    this.idDelete = id;
    this.modalDeleteBoolean = !this.modalDeleteBoolean;
    this.noScroll();
  }

  cancelModal() {
    this.modalDeleteBoolean = false;
    this.noScroll();
  }

  limpiarFormulario(form: FormGroup): void {
    Object.keys(form.controls).forEach(input => {
      const control = form.get(input);

      if (control instanceof FormControl) {
        form.get(input)?.setValue('');
        form.get(input)?.markAsPristine();
        form.get(input)?.markAsUntouched();
      } else if (control instanceof FormGroup) {
        this.limpiarFormulario(control);
      }

    });
    this.errorFlag = false;
  }

  formCliente = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    genero: new FormControl(''),
    direccion: new FormGroup({
      fracc: new FormControl(''),
      calle: new FormControl(''),
      numero: new FormControl('')
    })
  });

  enviarDatos() {
    if (this.formCliente.valid) {
      this.errorFlag = false;
      let cliente: ICliente = {
        nombre: this.formCliente.value.nombre ?? '',
        apellido: this.formCliente.value.apellido ?? '',
        genero: this.formCliente.value.genero ?? '',
        direccion: {
          fracc: this.formCliente.value.direccion?.fracc ?? '',
          calle: this.formCliente.value.direccion?.calle ?? '',
          numero: this.formCliente.value.direccion?.numero ?? ''
        }
      };

      if (this.editandoId) {
        this.crud.editCliente(this.editandoId, cliente).subscribe({
          next: () => {
            console.log('Cliente actualizado correctamente');
            this.limpiarFormulario(this.formCliente);
            this.editandoId = null;
            this.showForm();
          },
          error: err => console.error('Error: ', err)
        });
      } else {
        this.crud.addCliente(cliente).subscribe({
          next: () => { console.log('Cliente agregado correctamente'); this.limpiarFormulario(this.formCliente); this.showForm() },
          error: err => console.error('Error: ', err)
        })
      }
    } else {
      this.errorFlag = true;
    }
  }

  editForm(id: string) {
    this.closeBoolean = true;
    this.editandoId = id;
    this.noScroll();
    this.clientesArray$.subscribe(clientes => {
      const clienteActualizar = clientes.find(item => item.id === id);
      if (clienteActualizar) {
        this.formCliente.patchValue({
          nombre: clienteActualizar.nombre,
          apellido: clienteActualizar.apellido,
          genero: clienteActualizar.genero,
          direccion: {
            fracc: clienteActualizar.direccion?.fracc || '',
            calle: clienteActualizar.direccion?.calle || '',
            numero: clienteActualizar.direccion?.numero || ''
          }
        });
      }
    });
  }

  deleteCliente() {
    if (!this.idDelete) { return; }
    this.crud.deleteCliente(this.idDelete).subscribe({
      next: () => {
        console.log('Cliente eliminado correctamente');
        this.modalDeleteBoolean = false;
        this.idDelete = null;
      },
      error: err => console.error('Error eliminando cliente: ', err)
    });
  }
}
