import { Injectable } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl: string = environment.apiUrl;

  constructor(private service: HttpClient) {}

  /**
   * Method to get all clients
   * @returns clients
   */
  public getClients(): Observable<Client[]> {
    return this.service.get<Client[]>(this.apiUrl + 'clients/list');
  }
}
