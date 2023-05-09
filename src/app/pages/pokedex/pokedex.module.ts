import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from 'src/app/components/home/home.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { AppMaterialModuleModule } from 'src/app/shared/app-material-module.module';

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
    AppMaterialModuleModule,
  ],
})
export class PokedexModule { }
