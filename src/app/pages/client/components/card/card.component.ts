import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/utils/unsubscribe-adapter';
import Swal from 'sweetalert2';
import {
  state,
  style,
  transition,
  animate,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animate', [
      state(
        'open',
        style({
          height: '230px',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.5,
        })
      ),
      transition('* => closed', [animate('1s')]),
      transition('* => open', [animate('0.5s')]),
    ]),
  ],
})
export class CardComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit, OnChanges {
  @Input() client: Client;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router, private clientService: ClientService) {
    super();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  /**
   * Method to redirect a client to create form to update
   */
  public updateClient(): void {
    this.router.navigate(['clients/create', this.client.id]);
  }

  /**
   * Method to delete client by the services
   */
  public deleteClient(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.subs.add(
          this.clientService
            .deleteClient(this.client.id)
            .subscribe((client: Client) => {
              this.delete.emit(this.client.id);
              Swal.fire(
                'Deleted!',
                'Client ' +
                  client.name +
                  ' ' +
                  client.lastName +
                  ' deleted succesfully',
                'success'
              );
            })
        );
      }
    });
  }
}
