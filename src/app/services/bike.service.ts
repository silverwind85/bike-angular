import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Bike} from '../model/bike';


const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};


@Injectable()
export class BikeService {

  constructor(private http: HttpClient) {
  }

  const;
  apiUrl = 'server/api/v1/bikes';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getBikes(): Observable<Bike[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<Bike[]>(this.apiUrl, {
      headers: new HttpHeaders().set('Authorization', 'Bearer' + token)
    })
      .pipe(
        tap(heroes => console.log('fetched Bikes')),
        catchError(this.handleError('getBikes', []))
      );
  }

  getBike(id: number): Observable<Bike> {
    const token = localStorage.getItem('access_token');
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Bike>(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer' + token)
    }).pipe(
      tap(_ => console.log(`fetched Bike id=${id}`)),
      catchError(this.handleError<Bike>(`getBike id=${id}`))
    );
  }

  addBike(bike): Observable<Bike> {
    return this.http.post<Bike>(this.apiUrl, bike, httpOptions).pipe(
      tap(_ => console.log(`added Bike w/ id=${bike.id}`)),
      catchError(this.handleError<Bike>('addBike'))
    );
  }

  updateBike(id, bike): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, bike, httpOptions).pipe(
      tap(_ => console.log(`updated Bike id=${id}`)),
      catchError(this.handleError<any>('updateBike'))
    );
  }

  deleteBike(id): Observable<Bike> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Bike>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Bike id=${id}`)),
      catchError(this.handleError<Bike>('deleteBike'))
    );
  }


}

