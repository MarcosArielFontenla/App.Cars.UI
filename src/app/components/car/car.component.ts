import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/shared/models/car.model';
import { CarService } from 'src/app/shared/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})

export class CarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'age', 'modelName', 'color'];
  dataSource: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.getAllCars().subscribe((data: Car[]) => {
      console.log('cars data:', data);
      this.dataSource = data;
    }, (error) => {
      console.log('error has been detected!', error);
    });
  }
}
