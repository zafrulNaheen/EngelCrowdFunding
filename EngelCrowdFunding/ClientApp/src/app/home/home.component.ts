import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Funding, FundingAmount } from '../models/funding';
import { Investor } from '../models/investor';
import { FundingService } from '../services/funding.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public selectedUserId;
  fundings: Funding[];
  amount: number;
  fundingAmount: FundingAmount[];
  users:Investor[]


  constructor(private http: HttpClient,private fundingService: FundingService) {

    this.fundingService.getFundings().subscribe(fundings => this.fundings = fundings);

    this.fundingService.getUsers().subscribe(users => this.users = users);
    
  }

  addFunding(amount: number, fundingId: string,userId:string) {
    if (!amount) { return; }
    this.fundingService.addFunding({ amount: Number(amount), fundingId: fundingId, investorId: userId } as FundingAmount)
      .subscribe(fa => {
        this.fundingAmount.push(fa);
      });
  }
}
