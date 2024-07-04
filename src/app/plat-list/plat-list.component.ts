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
  favorites: any[] = [];
  userId: string = '667c53e0cc6a8a9f98ef3f24'; // Use a real user ID from authentication

  constructor(
    private platService: PlatService,
    private restaurantService: RestaurantService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPlats();
    this.loadRestaurants();
    this.loadFavorites();
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

  loadFavorites() {
    this.favoritesService.getFavorites(this.userId).subscribe((data) => {
      this.favorites = data;
    });
  }

  clearSearch(minCalories: any, maxCalories: any, restaurantSelector: any) {
    this.isFiltered = false;
    minCalories.value = '';
    maxCalories.value = '';
    restaurantSelector.value = '';
    this.platCombinations = [];
    this.plats = [];
    this.loadPlats();
  }

  searchPlatsWithinCalories(minCalories: number, maxCalories: number) {
    this.isFiltered = true;
    if (minCalories && maxCalories) {
      this.platService
        .findPlatsWithinCalories(minCalories, maxCalories)
        .subscribe(
          (data) => {
            this.platCombinations = data;
            this.plats = []; // Clear plats array when filtering by calories
          },
          (error) => {
            console.error('Error fetching plats within calories:', error);
          }
        );
    } else {
      this.platCombinations = [];
    }
  }

  searchByRestaurant(restaurantId: string) {
    this.isFiltered = false;
    if (restaurantId) {
      this.restaurantService
        .getRestaurantById(restaurantId)
        .subscribe((restaurant) => {
          const platObservables = restaurant.plats.map((plat: any) =>
            this.platService.getPlatById(plat._id)
          );
          forkJoin(platObservables).subscribe((platDetails: any[]) => {
            this.plats = platDetails;
            this.platCombinations = []; // Clear platCombinations array when filtering by restaurant
          });
        });
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
      .subscribe(() => {
        this.loadFavorites();
      });
  }

  goToDetails(id: string): void {
    this.router.navigate(['/plat', id]);
  }

  isLast(item: any, array: any[]): boolean {
    return array.indexOf(item) === array.length - 1;
  }
}
