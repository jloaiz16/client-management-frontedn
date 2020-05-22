import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from './services/client.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/utils/unsubscribe-adapter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  public clients: Client[] = [];

  constructor(private clientService: ClientService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.subs.add(
      this.clientService.getClients().subscribe((response: Client[]) => {
        this.clients = response;
      })
    );
  }

  goToCreateClient(): void {
    this.router.navigate(['clients/create']);
  }
}
