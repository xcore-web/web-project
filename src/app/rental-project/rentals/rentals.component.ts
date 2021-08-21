import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorHandlerService } from 'src/app/shared/_services/error-handler.service';
import { Rental } from '../core/models/rental.model';
import { RentalService } from '../core/services/rentals.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.scss']
})
export class RentalsComponent implements OnInit, AfterViewInit {

  columnsToDisplay: string[] = ['dateOfRental', 'dueDate', 'customer', 'media', 'category', 'update', 'delete'];
  dataSource = new MatTableDataSource<Rental>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private rentalService: RentalService,
    private errorService: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.getAllMedias();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getAllMedias = () => {
    this.rentalService.getAll().subscribe(res => {
      this.dataSource.data = res as Rental[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  delete(rentalId: number) {
    this.rentalService.delete(rentalId).subscribe(
      () => {
        this.getAllMedias();
      }
    )
  }

}
