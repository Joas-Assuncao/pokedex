import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Default } from 'src/app/models/global';


@Component({
  selector: 'poke-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() pokemons!: Default[];

  displayedColumns: string[] = ['id', 'name', 'image'];
  dataSource: MatTableDataSource<Default> = new MatTableDataSource<Default>(this.pokemons);

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.pokemons;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.length = this.pokemons.length;
  }

  onPageChanged(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    console.log(startIndex, endIndex)
    this.dataSource.data = this.pokemons.slice(startIndex, endIndex);
    console.log(this.dataSource.data)
  }
}
