import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public fundings: Funding[];
  amount: number;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.http.get<Funding[]>(this.baseUrl + 'fundings').subscribe(result => {
      this.fundings = result;
    }, error => console.error(error));
  }

  addFunding(amount: any, projectId: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    let params = new HttpParams();
    params = params.set('amount', amount);
    params = params.set('projectId', projectId);
    this.http.post<any>(this.baseUrl + 'fundings', params,headers);
  }
}

interface Funding {
  id:string
  date: string;
  projectName: string;
  area: number;
  description: string;
  purchasePrice:number
}
