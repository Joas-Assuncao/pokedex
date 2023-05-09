import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pokedex', pathMatch: 'full' },
  {
    path: 'pokedex',
    loadChildren: () =>
      import('./pages/pokedex/pokedex.module')
        .then(m => m.PokedexModule),
  },
  {
    path: 'pokemon/:id',
    loadChildren: () =>
      import('./pages/pokemon/pokemon.module')
        .then(m => m.PokemonModule),
  },
  { path: '**', redirectTo: 'pokedex', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
