import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from 'src/app/components/form/form.component';
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
    FormComponent,
  ],
  imports: [
    CommonModule,
    PokedexRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FormsModule,
  ]
})
export class PokedexModule { }
