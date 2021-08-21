import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ErrorHandlerService } from 'src/app/shared/_services/error-handler.service';
import { Customer } from '../core/models/customer.model';
import { CustomerService } from '../core/services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, AfterViewInit {

  columnsToDisplay: string[] = ['lastName', 'firstName', 'address', 'update', 'delete'];
  dataSource = new MatTableDataSource<Customer>();
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private customerService: CustomerService,
    private errorService: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
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

  public getAllCustomers = () => {
    this.customerService.getAll().subscribe(res => {
      this.dataSource.data = res as Customer[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  delete(customerId: number) {
    this.customerService.delete(customerId).subscribe(
      () => {
        this.getAllCustomers();
      }
    )
  }
}
