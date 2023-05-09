import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Default, ListPokemons } from 'src/app/models/global';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { UtilsFunctions } from 'src/app/shared/utils/UtilsFunctions';

@Component({
  selector: 'poke-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() getPokemons!: Observable<ListPokemons>;

  form: FormGroup;
  pokemons: Default[] = [];
  arePokemons: boolean = false;
  pageCount!: number;

  displayedColumns: string[] = ['id', 'name', 'image'];

  constructor(
    private pokeApi: PokeapiService,
    private utilsFunctions: UtilsFunctions,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.pokeApi.getPokemons('10', '0').subscribe({
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

        console.log(this.pokemons);
        this.arePokemons = true;
      },
      error: (err) => {
        this.onError('Error fetching pokemons!', err);
      }
    });
  }

  ngAfterViewInit() {
  }

  onPageChanged({ pageSize, pageIndex }: PageEvent) {
    const offset = pageSize * pageIndex;
    const limit = pageSize;

    this.pokeApi.getPokemons(limit.toString(), offset.toString()).subscribe(returnApi => {
      this.pokemons = returnApi.results.map((pokemon) => {
        const id: string = pokemon.url.split('pokemon')[1].replace(/\D/g, "");

        return {
          ...pokemon,
          id,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        }
      });
    });
  }

  searchPokemon() {
    this.pokeApi.getPokemonByName(this.form.controls['name'].value).subscribe({
      next: (pokemonInfo) => {
        this.pokemons = [
          { id: pokemonInfo?.id?.toString(), name: pokemonInfo.name, url: pokemonInfo['sprites']['other']['official-artwork']['front_default'] }
        ];

      },
      error: (err) => {
        this.onError('Pokemon not found, write better the name!', err);
      },
    });
  }

  private onError(message: string, err: Error) {
    console.error(err);
    this.utilsFunctions.showSnack(message);
  }
}
