import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from './services/client.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/utils/unsubscribe-adapter';
import { Router, ActivatedRoute } from '@angular/router';
import { IServerResponse } from 'src/app/shared/models/server-response.model';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  public clients: Client[] = [];
  public page: number;
  public paginator: any;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.subs.add(
      this.activatedRouter.paramMap.subscribe((params) => {
        this.page = +params.get('page');
        this.page = this.page ? this.page : 0;
        this.getClientList();
      })
    );
  }

  /**
   * Get list of clients from API with pagination
   * @method getClientList
   */
  private getClientList(): void {
    this.subs.add(
      this.clientService
        .getClients(this.page)
        .subscribe((response: IServerResponse) => {
          this.clients = response.content;
          this.paginator = {
            totalPages: response.totalPages,
            number: response.number,
            last: response.last,
            first: response.first,
          };
        })
    );
  }

  /**
   * Method to redirect to form create client
   * @method goToCreateClient
   */
  public goToCreateClient(): void {
    this.router.navigate(['clients/create']);
  }

  /**
   * Method to delete a client from the list
   * @method deleteClientFromList
   * @param id : number
   */
  public deleteClientFromList(id: number): void {
    this.clients = this.clients.filter((client: Client) => client.id !== id);
  }

  /**
   * Method to get clients by name
   * @method searchClient
   * @param value : any
   */
  public searchClient(event: any): void {
    this.subs.add(
      this.clientService
        .getClientsByName(event.target.value.toLowerCase())
        .subscribe((response: Client[]) => {
          this.clients = response;
        })
    );
  }
}
