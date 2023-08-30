import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriggerApiService {

  constructor() { }

  getEvents(): Observable<string> {
    return new Observable<string>(observer => {
      const eventSource = new EventSource('http://localhost:8080/sse'); // Replace with your Go backend URL

      eventSource.onmessage = event => {
        observer.next(event.data);
      };

      eventSource.onerror = error => {
        observer.error(error);
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
