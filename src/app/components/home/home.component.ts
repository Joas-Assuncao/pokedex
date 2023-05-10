import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Default } from 'src/app/models/global';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UtilsFunctions } from 'src/app/shared/utils/UtilsFunctions';

@Component({
  selector: 'poke-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  pokemons: Default[] = [];
  pokeTypes: Default[] = [];

  pageCount!: number;

  needPagination: boolean;
  haveAllPokemons: boolean;

  constructor(
    private fb: FormBuilder,
    private pokeApi: PokeapiService,
    private utilsFunctions: UtilsFunctions,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: [''],
    });

    this.pokemons = [];
    this.pokeTypes = [];
    this.pageCount = 1281;
    this.needPagination = false;
    this.haveAllPokemons = true;
  }

  ngOnInit(): void {
    this.getPokemons('10', '0');
    this.getPokemonTypes();
  }

  getPokemonTypes() {
    this.pokeApi.getPokeTypes().subscribe({
      next: (pokemonTypes) => {
        this.pokeTypes = pokemonTypes.results;
      },
      error: (err) => {
        this.onError('Types not found', err);
      }
    });
  }

  getPokemons(limit: string = '10', offset: string = '0') {
    this.pokeApi.getPokemons(limit, offset).subscribe({
      next: (returnApi) => {
        this.pageCount = returnApi.count;

        this.pokemons = returnApi.results.map((pokemon) => {
          const id: string = pokemon.url.split('pokemon')[1].replace(/\D/g, "");

          return {
            ...pokemon,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          }
        });

        this.needPagination = true;
        this.haveAllPokemons = true;
        this.form.setValue({
          name: '',
          type: '',
        });
      },
      error: (err) => {
        this.onError('Error fetching pokemons!', err);
      }
    });
  }

  getPokemonByNameOrId() {
    this.pokeApi.getPokemonByNameOrId(this.form.controls['name'].value).subscribe({
      next: (pokemonInfo) => {
        this.pokemons = [
          { id: pokemonInfo?.id?.toString(), name: pokemonInfo.name, url: pokemonInfo['sprites']['other']['official-artwork']['front_default'] }
        ];

        this.needPagination = false;
        this.haveAllPokemons = false;
      },
      error: (err) => {
        this.onError('Pokemon not found, write better the name!', err);
      },
    });
  }

  getPokemonsByType() {
    const url = this.form.controls['type'].value;

    if(!url) {
      this.onError('Type not found', 'Not found');
    }

    const endpoint = url.split('v2/')[1];

    this.pokeApi.getPokemonsByType(endpoint).subscribe({
      next: (pokemonsByType) => {
        this.pokemons = pokemonsByType.pokemon.map((slot: { pokemon: Default }) => {
          console.log(slot.pokemon)
          const id: string = slot.pokemon.url.split('pokemon')[1].replace(/\D/g, '');

          return {
            ...slot.pokemon,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          }
        });

        this.needPagination = false;
        this.haveAllPokemons = false;
      },
      error: (err) => {
        this.onError('Pokemons not found', err);
      }
    });
  }

  private onError(message: string, err: Error | string) {
    console.error(err);
    this.utilsFunctions.showSnack(message);
  }
}
