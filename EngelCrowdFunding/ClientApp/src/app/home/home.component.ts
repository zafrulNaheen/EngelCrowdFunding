import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public fundings: Funding[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Funding[]>(baseUrl + 'fundings').subscribe(result => {
      this.fundings = result;
    }, error => console.error(error));
  }
}

interface Funding {
  date: string;
  projectName: string;
  area: number;
  description: string;
  purchasePrice:number
}
