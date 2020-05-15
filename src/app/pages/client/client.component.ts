import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { clients } from 'src/app/shared/db/clients.json';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  public clients: Client[] = [];
  constructor() {}

  ngOnInit(): void {
    this.clients = clients;
  }
}
