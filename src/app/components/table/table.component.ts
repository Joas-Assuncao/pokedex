import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Default } from 'src/app/models/global';

@Component({
  selector: 'poke-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'image', 'isFavorite', 'details'];

  @Input() pokemons: Default[];
  @Input() form: FormGroup;
  @Input() pageCount: number;
  @Input() thereArePokemons: boolean;
  @Input() haveAllPokemons: boolean;

  @Output() eventGetPokemons = new EventEmitter();
  @Output() eventSavePokemon = new EventEmitter();

  constructor(
    private router: Router,
    private fb: FormBuilder,

  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: [''],
    });

    this.pokemons = [];
    this.pageCount = 1281;
    this.thereArePokemons = false;
    this.haveAllPokemons = true;
  }

  ngOnInit(): void { }

  getPokemons(limit: string, offset: string) {
    this.eventGetPokemons.emit({ limit, offset });
  }

  savePokemon(element: Default) {
    this.eventSavePokemon.emit(element);
  }

  onPageChanged({ pageSize, pageIndex }: PageEvent) {
    const offset = pageSize * pageIndex;
    const limit = pageSize;

    this.getPokemons(`${limit}`, `${offset}`);
  }

  goToPokemon(pokemonId: string) {
    this.router.navigate([`pokemon/${pokemonId}`])
  }
}
