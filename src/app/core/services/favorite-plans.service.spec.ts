import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorite-plans.service';

describe('FavoritePlansService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
