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

  // Retrieves a list of all cars from the API.
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  // Retrieves a car by ID from the API.
  getCarById(id: number): Observable<Car> {
    const getUrl = `${this.apiUrl}/${id}`;
    return this.http.get<Car>(getUrl);
  }

  // Creates a new car by sending a POST request to the API.
  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  // Updates an existing car by sending a PUT request to the API.
  updateCar(id: number, car: Car): Observable<Car> {
    const urlWithId = `${this.apiUrl}/${id}`;
    return this.http.put<Car>(urlWithId, car);
  }

  // Deletes a car by sending a DELETE request to the API.
  deleteCar(id: number): Observable<Car> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<Car>(deleteUrl);
  }
}
