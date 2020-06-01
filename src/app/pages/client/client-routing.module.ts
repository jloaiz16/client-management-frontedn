import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { CreateComponent } from './components/create/create.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
  },
  {
    path: 'page/:page',
    component: ClientComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'create/:id',
    component: CreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
