import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Student, IStudentResponse} from './search.class';



@Injectable({ providedIn: 'root' })
export class DataService {

    // Create an Observable that will create an AJAX request
    readonly username = 'TSTGSharp';
    readonly password = '7!8EU#xEz8=c88JH';
    readonly headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
    });

    readonly ROOT_URL = 'http://www.busplannerlive.ca/20140319/BPService/IBPService';
constructor(private http: HttpClient) {}

  search(filter: {name: string} = {name: ''}, page = 1): Observable<IStudentResponse> {
    return this.http.get<IStudentResponse>(this.ROOT_URL + '/GetStudentBasic',
    {headers: this.headers}
    )
  .pipe(
      tap((response: IStudentResponse) => {
        response.results = response.results
          .map(student => new Student(student.id, student.name))
          // Not filtering in the server since in-memory-web-api has somewhat restricted api
          .filter(user => user.name.includes(filter.name));

        return response;
      })
      );
  }
}
