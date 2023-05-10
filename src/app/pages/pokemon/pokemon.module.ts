import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/shared/app-material-module.module';
import { PokemonRoutingModule } from './pokemon-routing.module';

import { PokemonComponent } from './pokemon.component';

@NgModule({
  declarations: [
    PokemonComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    PokemonRoutingModule,
  ]
})
export class PokemonModule { }
