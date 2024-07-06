import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../core/services/favorite-plans.service';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-favorite-plans',
  templateUrl: './favorite-plans.component.html',
  styleUrls: ['./favorite-plans.component.css'],
})
export class FavoritePlansComponent implements OnInit {
  favorites: any[] = [];
  userId: string = this.auth.currentUserValue._id;
  constructor(
    private favoritesService: FavoritesService,
    private auth: AuthService
  ) {}

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
