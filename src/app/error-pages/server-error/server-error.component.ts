import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {
  
  public serverErrorText: string = `500 Internal Server Error`

  constructor() { }
  ngOnInit() {
  }
}
