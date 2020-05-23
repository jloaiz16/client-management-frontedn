import { Injectable } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CLIENTS } from 'src/app/shared/db/clients.json';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl: string = environment.apiUrl;
  private httpHeader = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private service: HttpClient) {}

  /**
   * Method to get all clients
   * @returns clients
   */
  public getClients(): Observable<Client[]> {
    return this.service.get<Client[]>(this.apiUrl + 'clients/list');
  }

  /**
   * Method to create a client
   * @param client : Client
   * @returns client
   */
  public createClient(client: Client): Observable<Client> {
    return this.service.post<Client>(this.apiUrl + 'clients', client, {
      headers: this.httpHeader,
    });
  }

  /**
   * Method to get a client by id
   * @param id: number
   * @returns client
   */
  public getClient(id: number): Observable<Client> {
    return this.service.get<Client>(this.apiUrl + 'clients/' + id);
  }

  /**
   * Method to update information of a client
   * @param client : Client
   * @returns client
   */
  public updateClient(client: Client): Observable<Client> {
    return this.service.put<Client>(
      this.apiUrl + 'clients/' + client.id,
      client,
      {
        headers: this.httpHeader,
      }
    );
  }

  /**
   * Method to delete a client
   * @param id : number
   */
  public deleteClient(id: number): Observable<Client> {
    return this.service.delete<Client>(this.apiUrl + 'clients/' + id, {
      headers: this.httpHeader,
    });
  }
}
