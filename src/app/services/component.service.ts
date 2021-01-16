import {  Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PetModel } from '../pet-model/pet.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private subject = new Subject<any>();

  sendMessage(message: any) {
      this.subject.next({ text: message });
      console.log(message)
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
      
  }
}