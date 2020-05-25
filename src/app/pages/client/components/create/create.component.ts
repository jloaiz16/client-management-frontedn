import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/utils/unsubscribe-adapter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public loadForm: boolean = false;
  public clientForm: FormGroup;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder
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
      this.buildClientForm();
      this.loadForm = true;
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
        this.buildClientForm();
        this.loadForm = true;
      })
    );
  }

  /**
   * Method to create a the client form
   */
  private buildClientForm(): void {
    this.clientForm = this.formBuilder.group({
      name: [this.client.name, [Validators.required, Validators.minLength(4)]],
      lastName: [this.client.lastName],
      email: [this.client.email, [Validators.required, Validators.email]],
    });
  }

  /**
   * Method to create a client in the service
   */
  public createClient(): void {
    this.client = this.clientForm.getRawValue();
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
    this.client.name = this.clientForm.controls.name.value;
    this.client.email = this.clientForm.controls.email.value;
    this.client.lastName = this.clientForm.controls.lastName.value;
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
