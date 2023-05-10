import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Default } from 'src/app/models/global';

@Component({
  selector: 'poke-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const pokemon = this.route.snapshot.data['pokemon'];

    this.pokemon = {
      id: pokemon.id,
      weight: pokemon.weight,
      height: pokemon.height,
      name: pokemon.name[0].toUpperCase() + pokemon.name.substring(1),
      url: [
        pokemon['sprites']['other']['official-artwork']['front_default'],
        pokemon['sprites']['other']['dream_world']['front_default'],
        pokemon['sprites']['back_shiny_female'],
        pokemon['sprites']['front_female'],
      ],
      moves: pokemon.moves.map((slot: { move: Default }) => slot.move.name).join(', '),
      types: pokemon.types.map((slot: { type: Default }) => slot.type.name).join(', '),
    };
  }

  goToList() {
    this.router.navigate([`pokedex`])
  }
}
