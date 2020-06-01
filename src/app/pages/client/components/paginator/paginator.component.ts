import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input()
  public paginator: any;
  public pages: number[];
  public from: number;
  public to: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.paginator) {
      this.loadPages();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.paginator.currentValue) {
      this.loadPages();
    }
  }

  /**
   * Create array of pages with the total Pages of paginator
   * @method loadPages
   */
  private loadPages(): void {
    if (this.paginator.totalPages > 5) {
      this.from = Math.min(
        Math.max(1, this.paginator.number - 4),
        this.paginator.totalPages - 5
      );
      this.to = Math.max(
        Math.min(this.paginator.totalPages, this.paginator.number + 4),
        6
      );
      this.pages = new Array(this.to - this.from + 1)
        .fill(0)
        .map((page, index) => {
          return index + this.from - 1;
        });
    } else {
      this.pages = new Array(this.paginator.totalPages)
        .fill(0)
        .map((page, index) => {
          return index;
        });
    }
  }
}
