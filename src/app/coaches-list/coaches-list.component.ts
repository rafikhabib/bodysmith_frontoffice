import { Component, ChangeDetectorRef, ViewEncapsulation, ChangeDetectionStrategy, AfterViewChecked, OnInit } from '@angular/core';
import { CoachesService } from '../core/services/coaches.service';

@Component({
  selector: 'app-coaches-list',
  templateUrl: './coaches-list.component.html',
  styleUrls: ['./coaches-list.component.css'],
})
export class CoachesListComponent {
  
  coaches: any[] = []; // Ensure coaches is initialized as an empty array
  errorMessage: string | null = null;
  clicked: boolean = false;
  piw: boolean = false;

  constructor(private coachesService: CoachesService, private cdr: ChangeDetectorRef) {
   
    this.coachesService.getCoaches().subscribe(
      (data) => {
        console.log(data);
        this.coaches = data;
        this.clicked = true;
      },
      (error) => {
        this.errorMessage = 'Error fetching coaches';
        console.error(error);
      }
    );
  }
 



  deleteCoach(id: string): void {
    this.coachesService.deleteCoach(id).subscribe(
      () => {
        this.coaches = this.coaches.filter(coach => coach._id !== id);
      },
      (error) => {
        this.errorMessage = 'Error deleting coach';
        console.error(error);
      }
    );
  }
}
