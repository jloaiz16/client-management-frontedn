import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public date: Date;
  public developer: string = 'Juan David Loaiza Botero';

  constructor() {}

  ngOnInit(): void {
    this.date = new Date();
  }
}
