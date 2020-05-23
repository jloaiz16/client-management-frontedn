import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/utils/unsubscribe-adapter';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  public client: Client = {
    id: null,
    name: null,
    lastName: null,
    createdAt: null,
    email: null,
    photo: null,
  };
  public isEditing: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params.id;
    if (id) {
      this.isEditing = true;
      this.loadClientInfo(id);
    } else {
      this.isEditing = false;
    }
  }

  /**
   * Method to load information of a client in the form
   * @param id : number
   */
  private loadClientInfo(id: number): void {
    this.subs.add(
      this.clientService.getClient(id).subscribe((client) => {
        this.client = client;
      })
    );
  }

  /**
   * Method to create a client in the service
   */
  public createClient(): void {
    this.subs.add(
      this.clientService
        .createClient(this.client)
        .subscribe((client: Client) => {
          Swal.fire(
            'New Client',
            'The client ' +
              client.name +
              ' ' +
              client.lastName +
              ' was created succesfully',
            'success'
          );
          this.router.navigateByUrl('clients');
        })
    );
  }

  /**
   * Method to create a client in the service
   */
  public updateClient(): void {
    this.subs.add(
      this.clientService
        .updateClient(this.client)
        .subscribe((client: Client) => {
          Swal.fire(
            'Client Updated',
            'The client ' +
              client.name +
              ' ' +
              client.lastName +
              ' was updated succesfully',
            'success'
          );
          this.router.navigateByUrl('clients');
        })
    );
  }
}
