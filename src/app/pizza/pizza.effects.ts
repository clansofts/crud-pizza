import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromPromise';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as actions from './pizza.actions';
import * as fromPizza from './pizza.reducer';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class PizzaEffects {
  // Listen for the 'QUERY' action, must be the first effect you trigger
  @Effect() _query: Observable<Action> = this._actions.ofType(actions.QUERY)
    .switchMap(action => {
      const ref = this._afs.collection<fromPizza.Pizza>('pizzas');
      return ref.snapshotChanges().map(arr => {
        return arr.map(doc => {
          const data = doc.payload.doc.data();
          return {
            id: doc.payload.doc.id,
            ...data
          } as fromPizza.Pizza
        })
      })
    })
    .map(arr => {
      console.log(arr);
      return new actions.AddAll(arr)
    });

  // Listen for the 'CREATE' action
  @Effect() _create: Observable<Action> = this._actions.ofType(actions.CREATE)
    .map((action: actions.Create) => action.pizza)
    .switchMap(pizza => {
      const ref = this._afs.doc<fromPizza.Pizza>(`pizzas/${pizza.id}`);
      return Observable.fromPromise(ref.set(pizza));
    })
    .map(() => new actions.Success());

  // Listen for the 'UPDATE' action
  @Effect() _update: Observable<Action> = this._actions.ofType(actions.UPDATE)
    .map((action: actions.Update) => action)
    .switchMap(data => {
      const ref = this._afs.doc<fromPizza.Pizza>(`pizzas/${data.id}`)
      return Observable.fromPromise(ref.update(data.changes))
    })
    .map(() => new actions.Success());

  // Listen for the 'DELETE' action
  @Effect() _delete: Observable<Action> = this._actions.ofType(actions.DELETE)
    .map((action: actions.Delete) => action.id)
    .switchMap(id => {
      const ref = this._afs.doc<fromPizza.Pizza>(`pizzas/${id}`)
      return Observable.fromPromise(ref.delete())
    })
    .map(() => new actions.Success());


  constructor(
    private _actions: Actions,
    private _afs: AngularFirestore
  ) {}
}
