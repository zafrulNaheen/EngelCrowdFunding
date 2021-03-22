import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Funding, FundingAmount } from '../models/funding';
import { MessageService } from './message.service';


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
  ///** GET hero by id. Return `undefined` when id not found */
  //getHeroNo404<Data>(id: number): Observable<Hero> {
  //  const url = `${this.serviceUrl}/?id=${id}`;
  //  return this.http.get<Hero[]>(url)
  //    .pipe(
  //      map(heroes => heroes[0]), // returns a {0|1} element array
  //      tap(h => {
  //        const outcome = h ? `fetched` : `did not find`;
  //        this.log(`${outcome} hero id=${id}`);
  //      }),
  //      catchError(this.handleError<Hero>(`getHero id=${id}`))
  //    );
  //}

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  //addHero(hero: Hero): Observable<Hero> {
  //  return this.http.post<Hero>(this.serviceUrl, hero, this.httpOptions).pipe(
  //    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
  //    catchError(this.handleError<Hero>('addHero'))
  //  );
  //}

  addFunding(fundingAmount: FundingAmount): Observable<FundingAmount> {
    const body = JSON.stringify(fundingAmount);
    return this.http.post<FundingAmount>(this.serviceUrl, body, this.httpOptions).pipe(
      tap((newFunding: FundingAmount) => this.log(`added funding w/ id=${newFunding.id}`)),
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