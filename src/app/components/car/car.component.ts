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

  displayedColumns: string[] = ['id', 'make', 'modelName', 'color', 'year', 'description', 'price', 'actions'];
  dataSource!: MatTableDataSource<Car>;
  editCarForm!: FormGroup;

  constructor(private carService: CarService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCars();
  }

  // Opens the dialog to add or edit a car.
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

  // Opens the dialog to update a car.
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

  // Deletes a car.
  deleteCar(id: number): void {
    this.carService.deleteCar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((car: Car) => car.id !== id);
      console.log('Car deleted successfully!');
    });
  }

  // Applies a filter to the data source based on user input.
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Get all cars list from service.
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
