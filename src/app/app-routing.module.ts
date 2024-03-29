import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './plantilla/chat/chat.component';
import { ContactenosComponent } from './plantilla/contactenos/contactenos.component';
import { ErrorComponent } from './plantilla/error/error.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';
import { MisionVisionComponent } from './plantilla/mision-vision/mision-vision.component';
import { ProductoDetallesComponent } from './plantilla/producto-detalles/producto-detalles.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path:'chat',
    component: ChatComponent,
  },
  {
    path:'Mision-Vision',
    component: MisionVisionComponent,
  },
  {
    path:'contactenos',
    component: ContactenosComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
  {
    path: 'producto-detalles/:id',
    component: ProductoDetallesComponent,
  },
  {
    path: 'seguridad',
    loadChildren: () =>
      import('./modulos/seguridad/seguridad.module').then(
        (x) => x.SeguridadModule
      ),
  },
  {
    path: 'administracion',
    loadChildren: () =>
      import('./modulos/administracion/administracion.module').then(
        (x) => x.AdministracionModule
      ),
  },
  {
    path: 'pedidos',
    loadChildren: () =>
      import('./modulos/pedidos/pedidos.module').then((x) => x.PedidosModule),
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
