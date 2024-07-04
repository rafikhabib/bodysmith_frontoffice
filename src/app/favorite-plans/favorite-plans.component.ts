import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../core/services/favorite-plans.service';

@Component({
  selector: 'app-favorite-plans',
  templateUrl: './favorite-plans.component.html',
  styleUrls: ['./favorite-plans.component.css'],
})
export class FavoritePlansComponent implements OnInit {
  favorites: any[] = [];
  userId: string = '667c53e0cc6a8a9f98ef3f24'; // Use a real user ID from authentication

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoritesService.getFavorites(this.userId).subscribe((data) => {
      this.favorites = data;
    });
  }

  removeFavorite(favoriteId: string) {
    this.favoritesService.removeFavorite(favoriteId).subscribe(() => {
      this.loadFavorites();
    });
  }
}
