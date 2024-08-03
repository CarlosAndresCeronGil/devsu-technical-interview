import { Component, computed, input, OnInit, signal } from '@angular/core';
import { product } from '../../../models/product';
import { Column } from '../../../models/column';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './shared-table.component.html',
  styleUrl: './shared-table.component.css'
})
export class SharedTableComponent implements OnInit {
  columns = input<Column[]>([]);
  listOfData = input<any[]>([]);
  auxListOfData = signal<any[]>([]);
  filteredCriteria = input.required({
    transform: (value: string) => value,
    alias: 'listCriteria'
  });

  listToBeShown = computed(() => {
    return this.auxListOfData()
      .filter((data) => {
        const dataValues: string[] = Object.values(data);
        return dataValues.some(s => s.includes(this.filteredCriteria()));
      })
  }
  );
  dataPerColumn = signal<any>([]);

  paginationOptions = signal<number[]>([
    1, 5, 10, 20
  ]);
  defaultNumberOfRows = 5;

  ngOnInit(): void {
    const initialList = this.listOfData().slice(0, this.defaultNumberOfRows);
    this.auxListOfData.set(initialList);
  }

  isImageUrl(value: string): boolean {
    return typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
  }

  changePagination(e: Event): void {
    const target = e.target as HTMLSelectElement;
    const selectedValue = +target.value;
    const newList = this.listOfData().slice(0, selectedValue);
    this.auxListOfData.set(newList);
  }

}
