import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  private apiUrl = 'http://localhost:5283/api/Cars';

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCarById(id: number): Observable<Car> {
    const getUrl = `${this.apiUrl}/${id}`;
    return this.http.get<Car>(getUrl);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  updateCar(id: number, car: Car): Observable<Car> {
    const urlWithId = `${this.apiUrl}/${id}`;
    return this.http.put<Car>(urlWithId, car);
  }

  deleteCar(id: number): Observable<Car> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<Car>(deleteUrl);
  }
}
