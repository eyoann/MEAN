import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  increase(membre) {
  	let headers = new HttpHeaders();
    headers.set('Content-type','application/json');
    let score = membre[0]['score'];
    score++;
    membre[0]['score'] = score;
  	return this.http.post("http://localhost:8888/change-score",membre[0],{headers : headers});
  }

  decrease(membre) {
  	let headers = new HttpHeaders();
    headers.set('Content-type','application/json');
    let score = membre[0]['score'];
    score--;
    membre[0]['score'] = score;
  	return this.http.post("http://localhost:8888/change-score",membre[0],{headers : headers});
  }
}
