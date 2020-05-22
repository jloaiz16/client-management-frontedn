import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public client: Client = {
    id: null,
    name: null,
    lastName: null,
    createdAt: null,
    email: null,
    photo: null,
  };

  constructor() {}

  ngOnInit(): void {}

  public createClient(): void {
    console.log(this.client);
  }
}
