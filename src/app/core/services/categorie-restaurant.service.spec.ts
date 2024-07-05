import { TestBed } from '@angular/core/testing';

import { CategorieRestaurantService } from './categorie-restaurant.service';

describe('CategorieRestaurantService', () => {
  let service: CategorieRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
