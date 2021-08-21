import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../shared/_services/repository.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  public claims: [] = [];
  constructor(private _repository: RepositoryService) { }
  ngOnInit(): void {
    this.getClaims();
  }
  public getClaims = () =>{
    this._repository.getData('api/companies/privacy')
    .subscribe(res => {
      this.claims = res as [];
    })
  }
}
