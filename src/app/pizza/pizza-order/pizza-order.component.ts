import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as actions from '../pizza.actions';
import * as fromPizza from '../pizza.reducer';

@Component({
  selector: 'pizza-order',
  template: `
    <h1>Welcome to Pizza!</h1>
    
    <div *ngFor="let pizza of pizzas | async">
      <img src="/assets/pizza.jpg" width="200px" alt="">
      <h3>Pizza ID: {{ pizza.id }}</h3>
      <p>Size: {{ pizza.size }}</p>
      
      <button
        *ngIf="pizza.size === 'small'"
        (click)="updatePizza(pizza.id, 'large')"
      >
        Upgrade to Large
      </button>
      <button
        *ngIf="pizza.size === 'large'"
        (click)="updatePizza(pizza.id, 'small')"
      >
        Downgrade to Large
      </button>
      
      <button
        (click)="deletePizza(pizza.id)"
      >
        Delete Pizza
      </button>
    </div>
    <button
      (click)="createPizza()"
    >
      Create new Pizza
    </button>
  `,
})
export class PizzaOrderComponent implements OnInit {

  pizzas: Observable<any>;

  constructor(private store: Store<fromPizza.State>) { }

  ngOnInit() {
    this.pizzas = this.store.select(fromPizza.selectAll)
  }

  createPizza() {
    const pizza: fromPizza.Pizza = {
      id: new Date().getUTCMilliseconds().toString(),
      size: 'small'
    };

    this.store.dispatch(new actions.Create(pizza))
  }

  updatePizza(id, size) {
    this.store.dispatch(new actions.Update(id, {size}))
  }

  deletePizza(id) {
    this.store.dispatch(new actions.Delete(id))
  }


}
