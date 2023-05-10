import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Default } from 'src/app/models/global';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UtilsFunctions } from 'src/app/shared/utils/UtilsFunctions';

@Component({
  selector: 'poke-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  form: FormGroup;

  pokemons: Default[] = [];
  pokeTypes: Default[] = [];
  displayedColumns: string[] = ['id', 'name', 'image', 'details'];

  pageCount!: number;

  thereArePokemons: boolean = false;
  haveAllPokemons: boolean = true;

  constructor(
    private pokeApi: PokeapiService,
    private utilsFunctions: UtilsFunctions,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: [''],
    });
  }

  ngOnInit(): void {
    this.getPokemons('10', '0');
    this.getPokemonTypes();
  }

  getPokemons(limit: string, offset: string) {
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

        this.thereArePokemons = true;
        this.haveAllPokemons = true;
        this.form.setValue({
          name: '',
          type: '',
        })
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

        this.haveAllPokemons = false;
      },
      error: (err) => {
        this.onError('Pokemon not found, write better the name!', err);
      },
    });
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

        this.haveAllPokemons = false;
      },
      error: (err) => {
        this.onError('Pokemons not found', err);
      }
    });
  }

  onPageChanged({ pageSize, pageIndex }: PageEvent) {
    const offset = pageSize * pageIndex;
    const limit = pageSize;

    this.getPokemons(limit.toString(), offset.toString());
  }

  goToPokemon(pokemonId: string) {
    this.router.navigate([`pokemon/${pokemonId}`])
  }

  private onError(message: string, err: Error | string) {
    console.error(err);
    this.utilsFunctions.showSnack(message);
  }
}
