import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonResolver implements Resolve<any> {
  constructor(private pokeApi: PokeapiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const name = route.params['name'];

    if(route.params && name) {
      return this.pokeApi.getPokemonByNameOrId(name);
    }

    return of(false);
  }
}
