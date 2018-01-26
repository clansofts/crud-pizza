import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PizzaOrderComponent } from './pizza-order/pizza-order.component';

import { pizzaReducer } from './pizza.reducer';
import { PizzaEffects } from './pizza.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('pizza', pizzaReducer),
    EffectsModule.forFeature([PizzaEffects]),
  ],
  exports: [PizzaOrderComponent],
  declarations: [PizzaOrderComponent]
})
export class PizzaModule { }
