import { Component, OnInit } from '@angular/core';
import { Default } from 'src/app/models/global';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'poke-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pokemons: Default[] = [];
  arePokemons: boolean = false;

  constructor(private pokeApi: PokeapiService) { }

  ngOnInit(): void {
    this.pokeApi.getPokemons('100', '0').subscribe(pokemons => {
      this.pokemons = pokemons.results.map((pokemon) => {
        const id: string = pokemon.url.split('pokemon')[1].replace(/\D/g, "");

        return {
          ...pokemon,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        }
      });

      this.arePokemons = true;
      console.log(this.pokemons)
    });

  }

}
