import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatService } from '../core/services/plat.service';

@Component({
  selector: 'app-plat-detail',
  templateUrl: './plat-detail.component.html',
  styleUrls: ['./plat-detail.component.css'],
})
export class PlatDetailComponent implements OnInit {
  plat: any;

  constructor(
    private route: ActivatedRoute,
    private platsService: PlatService
  ) {}

  ngOnInit(): void {
    this.platsService
      .getPlatById(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.plat = data;
      });
  }
}
