import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Default, ListPokemons } from '../models/global';
import { PokeTypes } from './PokeTypes';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private readonly URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getPokemons(limit: string, offset: string): Observable<ListPokemons> {
    return this.http.get<ListPokemons>(`${this.URL}pokemon/?limit=${limit}&offset=${offset}`).pipe(
      first(),
    );
  }

  getPokemonsByType(type: string): Observable<ListPokemons> {
    return this.http.get<ListPokemons>(`${this.URL}type/${type}`).pipe(
      first(),
    );
  }

  getPokeTypes(): Default[] {
    return PokeTypes;
  }
}
