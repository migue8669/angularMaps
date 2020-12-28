import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromCustomersActions from '../actions/pets.action';
import { FirebaseService } from 'src/app/firebase.service';

@Injectable()
export class CustomerEffects {

    constructor(private actions$: Actions, private customerservice: FirebaseService) {}

    @Effect()
    loadCustomers$ : Observable<Action> = this.actions$.pipe(
        ofType(fromCustomersActions.LOAD_CUSTOMERS),
        switchMap(() => this.customerservice.getAll()
        .pipe(
            map(response => {
                return new fromCustomersActions.LoadCustomersSuccess(response)
            },
            catchError(error => of(new fromCustomersActions.LoadCustomersFail(error)))
            )
         )
        )
    );

    // // Update Customer
    // @Effect()
    // updateCustomer$ : Observable<Action> = this.actions$.pipe(
    //     ofType(fromCustomersActions.UPDATE_CUSTOMER),
    //     map((action : fromCustomersActions.UpdateCustomer) => action.payload),
    //     switchMap((payload) => this.customerservice.updateCustomer(payload)
    //         .pipe(
    //             map(updatedCustomer => new fromCustomersActions.UpdateCustomerSuccess({
    //                 id: updatedCustomer['id'],
    //                 changes: updatedCustomer
    //             })
    //         ),
    //         catchError(error => of(new fromCustomersActions.UpdateCustomerFail(error))
    //     ))
    //   )
    // );

    // Add Customer
    @Effect()
    addCustomer$ : Observable<Action> = this.actions$.pipe(
        ofType(fromCustomersActions.ADD_CUSTOMER),
        map((action : fromCustomersActions.AddCustomer) => action.payload),
        switchMap((payload) => this.customerservice.crearReporte(payload)
            .pipe(
                map(response => new fromCustomersActions.AddCustomerSuccess(response)
            ),
            catchError(error => of(new fromCustomersActions.AddCustomerFail(error))
        ))
      )
    );

    // Delete Customer

    // @Effect()
    // deleteCustomer$ : Observable<Action> = this.actions$.pipe(
    //     ofType(fromCustomersActions.DELETE_CUSTOMER),
    //     map((action : fromCustomersActions.DeleteCustomer) => action.payload),
    //     switchMap((payload : number) => this.customerservice.deleteCustomer(payload)
    //         .pipe(
    //             map(()=> new fromCustomersActions.DeleteCustomerSuccess(payload)
    //         ),
    //         catchError(error => of(new fromCustomersActions.DeleteCustomerFail(error))
    //     ))
    //   )
    // );
    


}