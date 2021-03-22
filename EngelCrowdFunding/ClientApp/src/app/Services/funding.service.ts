import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Funding, FundingAmount } from '../models/funding';
import { MessageService } from './message.service';
import { Investor } from '../models/investor';


@Injectable({ providedIn: 'root' })
export class FundingService {

  public serviceUrl = 'https://localhost:5001/fundings';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService  ) {
  }


  /** GET fundings from the server */


  getFundings(): Observable<Funding[]> {
    return this.http.get<Funding[]>(this.serviceUrl)
      .pipe(
        tap(_ => this.log('fetched fundings')),
        catchError(this.handleError<Funding[]>('getFundings', []))
      );
  }

  getUsers(): Observable<Investor[]> {
    return this.http.get<Investor[]>(this.serviceUrl + "/users")
      .pipe(
        tap(_ => this.log('fetched investors')),
        catchError(this.handleError<Investor[]>('investors', []))
      );
  }
  

  addFunding(fundingAmount: FundingAmount): Observable<FundingAmount> {
    const body = JSON.stringify(fundingAmount);
    return this.http.post<FundingAmount>(this.serviceUrl, body, this.httpOptions).pipe(
      tap((newFunding: FundingAmount) => this.log(`added funding w/ amount=${newFunding.amount} user=${newFunding.investorId}`)),
      catchError(this.handleError<FundingAmount>('addFunding'))
    );
  }
  

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a Service message with the MessageService */
  private log(message: string) {
    this.messageService.add(`Service message: ${message}`);
  }
}