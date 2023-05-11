import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Default, ListPokemons } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private readonly URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getPokemons(limit?: string, offset?: string): Observable<ListPokemons> {
    return this.http.get<ListPokemons>(`${this.URL}pokemon/?limit=${limit || '10'}&offset=${offset || '0'}`).pipe(
      first(),
    );
  }

  getPokemonsByType(type: string): Observable<any> {
    return this.http.get<any>(`${this.URL}${type}`).pipe(
      first(),
    );
  }

  getPokeTypes(): Observable<ListPokemons> {
    return this.http.get<ListPokemons>(`${this.URL}type/`).pipe(
      first(),
    );
  }

  getPokemonByNameOrId(name: string): Observable<any> {
    return this.http.get<Default>(`${this.URL}pokemon/${name}`).pipe(
      first(),
    );
  }
}
