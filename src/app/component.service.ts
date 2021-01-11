import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PetModel } from './pet-model/pet.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private subject = new Subject<any>();

  sendMessage(message: PetModel) {
      this.subject.next({ text: message.segundoReporte });
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}