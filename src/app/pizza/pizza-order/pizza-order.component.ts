import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as actions from '../pizza.actions';
import * as fromPizza from '../pizza.reducer';

@Component({
  selector: 'pizza-order',
  template: `
    <h1 class="text-center m-5">Welcome to Pizza!</h1>
    <div class="row">
    <div *ngFor="let pizza of pizzas | async" class="col">
      <figure class="card-img-top">
        <img src="/assets/pizza.jpg" [style.width.px]="pizza.size === 'small' ? 150 : 200" alt="">
      </figure>
      
      <h5>Pizza ID: <span class="badge badge-info">{{ pizza.id }}</span></h5>
      <p>Size: {{ pizza.size }}</p>
      
      <button
        *ngIf="pizza.size === 'small'"
        (click)="updatePizza(pizza.id, 'large')"
        class="btn btn-warning mb-2"
      >
        Upgrade to Large
      </button>
      <button
        *ngIf="pizza.size === 'large'"
        (click)="updatePizza(pizza.id, 'small')"
        class="btn btn-warning mb-2"
      >
        Downgrade to Small
      </button>
      
      <button
        (click)="deletePizza(pizza.id)"
        class="btn btn-danger mb-2"
      >
        Delete Pizza
      </button>
      <hr>

    </div>
    </div>
    <button
      (click)="createPizza()"
      class="btn btn-success"
    >
      Create new Pizza
    </button>
  `,
  styles: [`
    figure {
      min-width: 200px;
      height: 119px;
    }
  `]
})
export class PizzaOrderComponent implements OnInit {

  pizzas: Observable<any>;

  constructor(private store: Store<fromPizza.State>) { }

  ngOnInit() {
    this.pizzas = this.store.select(fromPizza.selectAll);
    this.store.dispatch(new actions.Query())
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
