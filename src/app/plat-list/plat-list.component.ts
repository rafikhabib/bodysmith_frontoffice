import { Component, OnInit } from '@angular/core';
import { PlatService } from '../core/services/plat.service';
import { RestaurantService } from '../core/services/restaurant.service';
import { FavoritesService } from '../core/services/favorite-plans.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-plat-list',
  templateUrl: './plat-list.component.html',
  styleUrls: ['./plat-list.component.css'],
})
export class PlatListComponent implements OnInit {
  platCombinations: any[] = [];
  plats: any[] = [];
  restaurants: any[] = [];
  isFiltered = false;
  userId: string = '667c53e0cc6a8a9f98ef3f24'; // Use a real user ID from authentication
  restaurantSelected = false;
  errorMessage: string = '';

  constructor(
    private platService: PlatService,
    private restaurantService: RestaurantService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPlats();
    this.loadRestaurants();
  }

  loadPlats() {
    this.platService.getAllPlats().subscribe((data) => {
      this.plats = data;
    });
  }

  loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data;
    });
  }

  clearSearch(minCalories: any, maxCalories: any, restaurantSelector: any) {
    this.isFiltered = false;
    this.restaurantSelected = false;
    this.errorMessage = '';
    minCalories.value = '';
    maxCalories.value = '';
    restaurantSelector.value = '';
    this.platCombinations = [];
    this.plats = [];
    this.loadPlats();
  }

  searchPlatsWithinCalories(minCalories: number, maxCalories: number) {
    if (minCalories <= 0 || maxCalories <= 0) {
      this.errorMessage = 'Calories must be positive values.';
      this.isFiltered = false;
      this.platCombinations = [];
      return;
    }

    if (minCalories >= maxCalories) {
      this.errorMessage = 'Max calories must be greater than min calories.';
      this.isFiltered = false;
      this.platCombinations = [];
      return;
    }

    this.errorMessage = '';
    this.isFiltered = true;
    this.platService
      .findPlatsWithinCalories(minCalories, maxCalories)
      .subscribe(
        (data) => {
          this.platCombinations = data;
          if (this.platCombinations.length === 0) {
            this.errorMessage =
              'No plans found within the specified calorie range.';
          }
        },
        (error) => {
          console.error('Error fetching plats within calories:', error);
          // Handle error, maybe show a message to the user
          this.errorMessage =
            'No plans found within the specified calorie range.';
        }
      );
  }

  searchByRestaurant(restaurantId: string) {
    this.isFiltered = false;
    this.restaurantSelected = true;
    this.plats = []; // Clear plats array initially

    if (restaurantId) {
      this.restaurantService.getRestaurantById(restaurantId).subscribe(
        (restaurant) => {
          const platObservables = restaurant.plats.map((plat: any) =>
            this.platService.getPlatById(plat._id)
          );
          forkJoin(platObservables).subscribe(
            (platDetails: any[]) => {
              this.plats = platDetails;
              if (this.plats.length === 0) {
                this.restaurantSelected = false; // No plats found for the selected restaurant
              }
            },
            (error) => {
              console.error('Error fetching plats for the restaurant:', error);
              this.plats = []; // Ensure plats array is empty on error
            }
          );
        },
        (error) => {
          console.error('Error fetching restaurant by ID:', error);
          this.plats = []; // Ensure plats array is empty on error
        }
      );
    } else {
      this.loadPlats();
    }
  }

  addToFavorites(plan: any) {
    // Extracting IDs from each part of the plan
    const plats = [plan.entree._id, plan.platPricipale._id, plan.dessert._id];
    const totalCalories = plan.totalCalories;

    this.favoritesService
      .addFavorite(this.userId, plats, totalCalories)
      .subscribe();
  }

  goToDetails(id: string): void {
    this.router.navigate(['/plat', id]);
  }

  isLast(item: any, array: any[]): boolean {
    return array.indexOf(item) === array.length - 1;
  }
}
