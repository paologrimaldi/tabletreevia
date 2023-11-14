import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  private token = null;
private app;    
private user;
    mongotoken: Observable<any>;
  constructor(  private http: HttpClient) { 
   
  }






  //create a function to save a json to mongoDB

public authenticateToMongoDB(email: string, pass: string): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    let authObj = {
        "username": email,
        "password": pass
    }

    return this.http.post<any>('https://realm.mongodb.com/api/client/v2.0/app/data-vutgt/auth/providers/local-userpass/login', authObj, httpOptions)
        .pipe(
            tap(response => {
                console.log('MongoDB authentication successful');
                this.mongotoken = response.access_token;
            }),
            catchError(error => {
                console.error(error);
                throw error;
            })
        );
}


public getJSONFromMongoDB(json: any, token: String): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };

    return this.http.post<any>('https://us-east-2.aws.data.mongodb-api.com/app/data-vutgt/endpoint/data/v1/action/findOne', json, httpOptions)
            .pipe(
            tap(_ => console.log('JSON object saved to MongoDB')),
            catchError(error => {
                console.error(error);
                throw error;
            })
            );

  }

  public saveJsonToMongoDB(json: any, token: String): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };

    return this.http.post<any>('https://us-east-2.aws.data.mongodb-api.com/app/data-vutgt/endpoint/data/v1/action/insertOne', json, httpOptions)
            .pipe(
            tap(_ => console.log('JSON object saved to MongoDB')),
            catchError(this.handleError<any>('saveJsonToMongoDB'))
            );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  alert(error);
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
