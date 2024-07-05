import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { RestaurantService } from '../core/services/restaurant.service';
import { CategorieRestaurantService } from '../core/services/categorie-restaurant.service';
import { PlatService } from '../core/services/plat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
})
export class RestaurantListComponent implements OnInit {
  restaurants: any[] = [];
  categories: any[] = [];
  plats: any[] = [];
  errorMessage: string = '';

  constructor(
    private restaurantService: RestaurantService,
    private categorieRestaurantService: CategorieRestaurantService,
    private platService: PlatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
    this.loadCategories();
    this.loadPlats();
  }

  loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
        this.errorMessage =
          'Failed to load restaurants. Please try again later.';
      }
    );
  }

  loadCategories() {
    this.categorieRestaurantService.getAllCategorieRestaurants().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.errorMessage =
          'Failed to load categories. Please try again later.';
      }
    );
  }

  loadPlats() {
    this.platService.getAllPlats().subscribe(
      (data) => {
        this.plats = data;
      },
      (error) => {
        console.error('Error fetching plats:', error);
        this.errorMessage = 'Failed to load plats. Please try again later.';
      }
    );
  }

  searchRestaurants(query: string) {
    if (query) {
      this.restaurantService.searchRestaurantsByAddress(query).subscribe(
        (data) => {
          this.restaurants = data;
        },
        (error) => {
          console.error('Error searching restaurants:', error);
          this.errorMessage =
            'Failed to search restaurants. Please try again later.';
        }
      );
    } else {
      this.loadRestaurants();
    }
  }

  clearSearch(
    searchString: any,
    maxDistance: any,
    categorySelector: any,
    platSelector: any
  ) {
    searchString.value = '';
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
                this.errorMessage =
                  'Failed to find nearby restaurants. Please try again later.';
              }
            );
        },
        (error) => {
          console.error('Error getting user location:', error);
          this.errorMessage =
            'Failed to get user location. Please enable location services.';
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }

  searchByCategory(categoryId: string) {
    if (categoryId) {
      this.categorieRestaurantService
        .getCategorieRestaurantById(categoryId)
        .subscribe(
          (data) => {
            const restaurantObservables = data.restaurants.map(
              (restaurant: any) =>
                this.restaurantService.getRestaurantById(restaurant._id)
            );
            forkJoin(restaurantObservables).subscribe(
              (restaurantDetails: any[]) => {
                this.restaurants = restaurantDetails;
              },
              (error) => {
                console.error('Error fetching restaurants by category:', error);
                this.errorMessage =
                  'Failed to fetch restaurants by category. Please try again later.';
              }
            );
          },
          (error) => {
            console.error('Error fetching category details:', error);
            this.errorMessage =
              'Failed to fetch category details. Please try again later.';
          }
        );
    } else {
      this.loadRestaurants();
    }
  }

  searchByPlat(platId: string) {
    if (platId) {
      this.platService.getPlatById(platId).subscribe(
        (data) => {
          const restaurantObservables = data.restaurants.map(
            (restaurant: any) =>
              this.restaurantService.getRestaurantById(restaurant._id)
          );
          forkJoin(restaurantObservables).subscribe(
            (restaurantDetails: any[]) => {
              this.restaurants = restaurantDetails;
            },
            (error) => {
              console.error('Error fetching restaurants by plat:', error);
              this.errorMessage =
                'Failed to fetch restaurants by plat. Please try again later.';
            }
          );
        },
        (error) => {
          console.error('Error fetching plat details:', error);
          this.errorMessage =
            'Failed to fetch plat details. Please try again later.';
        }
      );
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
