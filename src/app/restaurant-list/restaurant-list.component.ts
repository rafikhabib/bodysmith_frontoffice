import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../core/services/restaurant.service';
import { CategorieRestaurantService } from '../core/services/categorie-restaurant.service'; // Assuming you have this service
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { PlatService } from '../core/services/plat.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
})
export class RestaurantListComponent implements OnInit {
  restaurants: any[] = [];
  categories: any[] = []; // Array to hold categories
  plats: any[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private categorieRestaurantService: CategorieRestaurantService, // Assuming you have this service
    private platService: PlatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
    this.loadCategories();
    this.loadPlats();
  }

  loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data;
    });
  }

  loadCategories() {
    this.categorieRestaurantService
      .getAllCategorieRestaurants()
      .subscribe((data) => {
        this.categories = data;
      });
  }

  loadPlats() {
    this.platService.getAllPlats().subscribe((data) => {
      this.plats = data;
    });
  }

  searchRestaurants(query: string) {
    if (query) {
      this.restaurantService
        .searchRestaurantsByAddress(query)
        .subscribe((data) => {
          this.restaurants = data;
        });
    } else {
      this.loadRestaurants();
    }
  }

  clearSearch(
    input: any,
    maxDistance: any,
    categorySelector: any,
    platSelector: any
  ) {
    input.value = '';
    maxDistance.value = '';
    categorySelector.value = '';
    platSelector.value = '';
    this.loadRestaurants();
  }

  findNearbyRestaurants(radius: number) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          this.restaurantService
            .findNearbyRestaurants(latitude, longitude, radius * 1000)
            .subscribe(
              (data) => {
                this.restaurants = data;
              },
              (error) => {
                console.error('Error fetching nearby restaurants:', error);
              }
            );
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  searchByCategory(categoryId: string) {
    if (categoryId) {
      this.categorieRestaurantService
        .getCategorieRestaurantById(categoryId)
        .subscribe((data) => {
          const restaurantObservables = data.restaurants.map(
            (restaurant: any) =>
              this.restaurantService.getRestaurantById(restaurant._id)
          );
          forkJoin(restaurantObservables).subscribe(
            (restaurantDetails: any[]) => {
              this.restaurants = restaurantDetails;
            }
          );
        });
    } else {
      this.loadRestaurants();
    }
  }

  searchByPlat(platId: string) {
    if (platId) {
      this.platService.getPlatById(platId).subscribe((data) => {
        const restaurantObservables = data.restaurants.map((restaurant: any) =>
          this.restaurantService.getRestaurantById(restaurant._id)
        );
        forkJoin(restaurantObservables).subscribe(
          (restaurantDetails: any[]) => {
            this.restaurants = restaurantDetails;
          }
        );
      });
    } else {
      this.loadRestaurants();
    }
  }
  isLast(item: any, array: any[]): boolean {
    return array.indexOf(item) === array.length - 1;
  }
  goToDetails(id: string): void {
    this.router.navigate(['/restaurant', id]);
  }
}
