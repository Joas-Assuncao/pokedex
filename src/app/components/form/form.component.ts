import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Default } from 'src/app/models/global';

@Component({
  selector: 'poke-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() needPagination: boolean;
  @Input() haveAllPokemons: boolean;
  @Input() pokeTypes: Default[];

  @Output() eventGetPokemons = new EventEmitter();
  @Output() eventGetPokemonsByType = new EventEmitter();
  @Output() eventGetPokemonByNameOrId = new EventEmitter();

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: [''],
    });

    this.pokeTypes = [];
    this.needPagination = false;
    this.haveAllPokemons = true;
  }

  ngOnInit(): void {
  }

  getPokemonsByType() {
    this.eventGetPokemonsByType.emit();
  }

  getPokemonByNameOrId() {
    this.eventGetPokemonByNameOrId.emit();
  }

  getPokemons() {
    this.eventGetPokemons.emit({ limit: '10', offset: '0' });
  }
}
