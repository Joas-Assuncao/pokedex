import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonResolver } from './pages/pokemon/pokemon.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'pokedex', pathMatch: 'full' },
  {
    path: 'pokedex',
    loadChildren: () =>
      import('./pages/pokedex/pokedex.module')
        .then(m => m.PokedexModule),
  },
  {
    path: 'pokemon/:name',
    loadChildren: () =>
      import('./pages/pokemon/pokemon.module')
        .then(m => m.PokemonModule),
    resolve: { pokemon: PokemonResolver },
  },
  { path: '**', redirectTo: 'pokedex' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
