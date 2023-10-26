import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/app/shared/models/car.model';
import { CarService } from 'src/app/shared/services/car.service';
import { CarDialogComponent } from '../car-dialog/car-dialog.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})

export class CarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'make', 'modelName', 'color', 'year', 'description', 'price'];
  dataSource!: MatTableDataSource<Car>;
  editCarForm!: FormGroup;

  constructor(private carService: CarService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCars();
  }

  // Open the dialog to add or edit a car.
  openAddEditForm(): void {
    const dialogRef = this.dialog.open(CarDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.getAllCars();
        }
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  // Opens the dialog to update a car.
  openUpdateCar(car: Car): void {
    const dialogRef = this.dialog.open(CarDialogComponent, {
      data: car,
    });
    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.getAllCars();
        }
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  // Deletes a car.
  deleteCar(id: number): void {
    this.carService.deleteCar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((car: Car) => car.id !== id);
      console.log('Car deleted successfully');
    })
  }

  // Get all cars list from service.
  private getAllCars(): void {
    this.carService.getAllCars().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

}
