export interface Funding
{
  id:string;
  date: string;
  projectName: string;
  area: number;
  description: string;
  purchasePrice:number
}

export interface FundingAmount {
  id: string;
  fundingId: string;
  amount: number;
  investorId:string
}