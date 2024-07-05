import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../core/services/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css'],
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: any;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.restaurantService
      .getRestaurantById(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.restaurant = data;
      });
  }
}
