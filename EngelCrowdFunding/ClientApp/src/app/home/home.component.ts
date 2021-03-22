import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Funding, FundingAmount } from '../models/funding';
import { FundingService } from '../services/funding.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  fundings: Funding[];
  amount: number;
  fundingAmount: FundingAmount[];


  constructor(private http: HttpClient,private fundingService: FundingService) {

    this.fundingService.getFundings().subscribe(fundings => this.fundings = fundings);
    
  }

  addFunding(amount: number, fundingId: string) {
    if (!amount) { return; }
    this.fundingService.addFunding({ amount: Number(amount), fundingId:fundingId } as FundingAmount)
      .subscribe(fa => {
        this.fundingAmount.push(fa);
      });
  }
}
