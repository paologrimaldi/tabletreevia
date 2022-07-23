import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Category, CategoryResponse } from '../category.interface';
import { Observable, of } from 'rxjs';
import { Token } from '../token.interface';
import { Question, QuestionResult } from '../question.interface';
@Injectable({
  providedIn: 'root'
})
export class OpentriviaService {

  private token;

  constructor(  private http: HttpClient) { }



  getTriviaCategories(): Observable<Category[]> {
    return this.http.get<CategoryResponse>('https://opentdb.com/api_category.php')
      .pipe(
        map(res => res.trivia_categories), //
        catchError(this.handleError<Category[]>('getTriviaCategories', []))
      );
  }

  getSessionToken(): Observable<Token> {
    return this.http.get<Token>('https://opentdb.com/api_token.php?command=request')
      .pipe( //
        catchError(this.handleError<Token>('getToken', null))
      );
  }

  getQuestionByCategory(id,difficulty): Observable<QuestionResult> {
    return this.http.get<QuestionResult>('https://opentdb.com/api.php?amount=1&category=' + id + '&difficulty=' + difficulty + '&token=' + this.token)
      .pipe( //
        catchError(this.handleError<QuestionResult>('getQuestion', null))
      );
  }
  setToken(token)
  {
    this.token = token;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
