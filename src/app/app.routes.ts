import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {path: '', component: ClientesComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'about', component: AboutComponent}
];
