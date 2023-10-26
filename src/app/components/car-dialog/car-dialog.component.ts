import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Car } from 'src/app/shared/models/car.model';
import { CarService } from 'src/app/shared/services/car.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.scss']
})

export class CarDialogComponent implements OnInit {

  carFormGroup: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CarDialogComponent>,
    private carService: CarService,
    @Inject(MAT_DIALOG_DATA) public data: Car,
    private formBuilder: FormBuilder) {
      this.carFormGroup = this.formBuilder.group({
        make: '',
        modelName: '',
        color: '',
        year: 0,
        description: '',
        price: 0
      });
  }

  ngOnInit(): void {
    this.carFormGroup.patchValue(this.data);
  }

  // Handles the form submission, either updating or creating a car.
  onFormSubmit(): void {
    if (this.carFormGroup.valid && this.data) {
      // Update an existing car.
      this.carService.updateCar(this.data.id, this.carFormGroup.value).subscribe({
        next: (val: any) => {
          console.log('Car updated successfully!');
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    } else {
      // Create a new car.
      this.carService.createCar(this.carFormGroup.value).subscribe({
        next: (val: any) => {
          console.log('Car created successfully!');
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
