import { ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorHandlerService } from 'src/app/shared/_services/error-handler.service';
import { Media } from '../core/models/media.model';
import { MediaService } from '../core/services/medias.service';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.scss']
})
export class MediasComponent implements OnInit, AfterViewInit {

  columnsToDisplay: string[] = ['itemTitle', 'category', 'update', 'delete'];
  dataSource = new MatTableDataSource<Media>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private mediaService: MediaService,
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
    this.mediaService.getAll().subscribe(res => {
      this.dataSource.data = res as Media[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  delete(mediaId: number) {
    this.mediaService.delete(mediaId).subscribe(
      () => {
        this.getAllMedias();
      }
    )
  }
}
