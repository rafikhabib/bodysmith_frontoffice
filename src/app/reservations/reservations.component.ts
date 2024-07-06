import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReservationsService } from '../core/services/reservations.service';
import { SessionsService } from '../core/services/sessions.service';
import { CoachesService } from '../core/services/coaches.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  seances: any[] = [];
  filteredSeances: any[] = []; // Nouvelle propriété pour les séances filtrées
  users: any[] = [];
  reservationForm: FormGroup;
  isModalOpen = false;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationsService,
    private sessionService: SessionsService,
    private coachesService: CoachesService
  ) {
    this.reservationForm = this.fb.group({
      seanceId: ['', Validators.required],
      UserId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSeances();
    this.loadUsers();
  }

  // loadSeances() {
  //   this.sessionService.getSessions().subscribe(
  //     seances => {
  //       this.seances = seances;
  //       // Filtrage des séances pour ne conserver que celles avec TypeEvent = PRIVATE_COURSE
  //       this.filteredSeances = this.seances.filter(seance => seance.TypeEvent === 'PRIVATE_COURSE');
  //     },
  //     error => {
  //       console.error('Erreur lors du chargement des séances :', error);
  //     }
  //   );
  // }
loadSeances() {
  this.sessionService.getSessions().subscribe(
    seances => {
      console.log('Séances reçues :', seances); // Vérifiez les données reçues
      this.seances = seances;
      this.filteredSeances = this.seances.filter(seance => {
        // Vérifiez que TypeEvent est un tableau et contient 'PRIVATE_COURSE'
        if (Array.isArray(seance.TypeEvent)) {
          return seance.TypeEvent.includes('PRIVATE_COURSE');
        }
        return false;
      });
      console.log('Séances filtrées :', this.filteredSeances);
    },
    error => {
      console.error('Erreur lors du chargement des séances :', error);
    }
  );
}

  loadUsers() {
    this.coachesService.getCoaches().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Erreur lors du chargement des coaches :', error);
      }
    );
  }

  onSubmit() {
   
    if (this.reservationForm.valid) {
      const reservationData = this.reservationForm.value;
      this.reservationService.createReservation(reservationData).subscribe(
        response => {
          console.log('Réservation créée avec succès :', response);
          // this.showModal();
          alert('Réservation réussie!');
        },
        error => {
          console.error('Erreur lors de la création de la réservation :', error);
          if (error.status === 404) {
            console.error('Endpoint not found. Please check the URL.');
          } else if (error.status === 400) {
            console.error('Bad request:', error.error);
          } else if (error.status === 500) {
            console.error('Internal server error:', error.error);
          } else {
            console.error('Unexpected error:', error.error);
          }
        }
      );
    } else {
      this.reservationForm.markAllAsTouched();
    }
    
  }
    // showModal() {
    //   this.isModalOpen = true;
    //   const modal = document.getElementById('reservationModal');
    //   if (modal) {
    //     modal.style.display = 'block';
    //   }
    // }
    
    // closeModal() {
    //   this.isModalOpen = false;
    //   const modal = document.getElementById('reservationModal');
    //   if (modal) {
    //     modal.style.display = 'none';
    //   }
    // }
  }

