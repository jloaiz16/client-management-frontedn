import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { CardComponent } from './components/card/card.component';
import { CreateComponent } from './components/create/create.component';
import { ClientService } from 'src/app/pages/client/services/client.service';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [ClientComponent, CardComponent, CreateComponent, PaginatorComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ClientService],
})
export class ClientModule {}
