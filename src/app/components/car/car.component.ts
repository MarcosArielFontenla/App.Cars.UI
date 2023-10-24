import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from 'src/app/shared/models/car.model';
import { CarService } from 'src/app/shared/services/car.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { CarDialogComponent } from '../car-dialog/car-dialog.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})

export class CarComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'year', 'modelName', 'color', 'actions'];
  dataSource!: MatTableDataSource<Car>;
  editCarForm!: FormGroup;

  constructor(private carService: CarService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCars();
  }

  openAddEditForm(): void {
    const dialogRef = this.dialog.open(CarDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllCars();
        }
      },
    });
  }

  openUpdateCar(car: Car): void {
    const dialogRef = this.dialog.open(CarDialogComponent, {
      data: car,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllCars();
        }
      },
    });
  }

  deleteCar(id: number): void {
    this.carService.deleteCar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((car: Car) => car.id !== id);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getAllCars(): void {
    this.carService.getAllCars().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
}
