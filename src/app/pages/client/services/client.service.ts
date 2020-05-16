import { Injectable } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { CLIENTS } from 'src/app/shared/db/clients.json';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor() {}

  /**
   * Method to get all clients
   * @returns clients
   */
  public getClients(): Observable<Client[]> {
    return of(CLIENTS);
  }
}
