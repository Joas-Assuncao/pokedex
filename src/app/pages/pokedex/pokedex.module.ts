import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from 'src/app/components/home/home.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { AppMaterialModule } from 'src/app/shared/app-material-module.module';

import { PokedexRoutingModule } from './pokedex-routing.module';
import { PokedexComponent } from './pokedex.component';

@NgModule({
  declarations: [
    PokedexComponent,
    TableComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MatCardModule,
  ]
})
export class PokedexModule { }
