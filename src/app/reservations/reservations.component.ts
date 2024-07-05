// // reservation-form.component.ts
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
// import { ReservationsService } from '../core/services/reservations.service';
// import { SessionsService } from '../core/services/sessions.service'
// import { CoachesService } from '../core/services/coaches.service'
// @Component({
//   selector: 'app-reservations',
//   templateUrl: './reservations.component.html',
//    styleUrls: ['./reservations.component.css']
// })
// export class ReservationsComponent implements OnInit {
//   seances: any[] = [];
//   users: any[] = [];
//   reservationForm:  FormGroup = new FormGroup({
//     seances: new FormControl("", [
//       Validators.required
//     ]),
//     users: new FormControl("", [
//       Validators.required
//     ]),
   
//   });;
  

//   constructor(
//     private fb: FormBuilder,
//     private reservationService: ReservationsService,
//     private sessionService: SessionsService, 
//     private coachesService: CoachesService 
//   ) {
//     this.reservationForm = this.fb.group({
//       seanceId: ['', Validators.required],
//       coachId: ['', Validators.required],
//       // Ajoutez d'autres champs nécessaires pour la réservation si nécessaire
//     });
//   }
  

//   ngOnInit(): void {
//     this.reservationForm = this.fb.group({
//       seance: ['', Validators.required],
//       UserId: ['', Validators.required],
//       // Ajoutez d'autres champs nécessaires pour la réservation si nécessaire
//     });

//     this.loadSeances();
//     this.loadUsers();
//   }
// //   loadSeances() {
// //     this.sessionService.getSessions().subscribe(seances => {
// //       this.seances = seances;
// //     });
// //   }
  
// //   loadUsers() {
// //     this.coachesService.getCoaches().subscribe(users => {
// //       this.users = users;
// //     });
// //   }
// loadSeances() {
//     this.sessionService.getSessions().subscribe(
//       seances => {
//         this.seances = seances;
//       },
//       error => {
//         console.error('Erreur lors du chargement des séances :', error);
//       }
//     );
//   }
  
//   loadUsers() {
//     this.coachesService.getCoaches().subscribe(
//       users => {
//         this.users = users;
//       },
//       error => {
//         console.error('Erreur lors du chargement des coaches :', error);
//       }
//     );
//   }
//   onSubmit() {
//     if (this.reservationForm.valid) {
//       const reservationData = this.reservationForm.value;
//       this.reservationService.createReservation(reservationData).subscribe(
//         response => {
//           console.log('Réservation créée avec succès :', response);
//           console.log('reservationData :', reservationData);
//           // Action après la création réussie
//         },
//         error => {
//           console.error('Erreur lors de la création de la réservation :', error);
//           // Gérer les erreurs ici
//         }
//       );
//     } else {
//       this.reservationForm.markAllAsTouched();
//     }
//   }
// }











// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { ReservationsService } from '../core/services/reservations.service';
// import { SessionsService } from '../core/services/sessions.service';
// import { CoachesService } from '../core/services/coaches.service';

// @Component({
//   selector: 'app-reservations',
//   templateUrl: './reservations.component.html',
//   styleUrls: ['./reservations.component.css']
// })
// export class ReservationsComponent implements OnInit {
//   seances: any[] = [];
//   users: any[] = [];
//   reservationForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private reservationService: ReservationsService,
//     private sessionService: SessionsService,
//     private coachesService: CoachesService
//   ) {
//     this.reservationForm = this.fb.group({
//       seance: ['', Validators.required],
//       UserId: ['', Validators.required],
//       // Ajoutez d'autres champs nécessaires pour la réservation si nécessaire
//     });
//   }

//   ngOnInit(): void {
//     this.loadSeances();
//     this.loadUsers();
//   }

//   loadSeances() {
//     this.sessionService.getSessions().subscribe(
//       seances => {
//         this.seances = seances;
//       },
//       error => {
//         console.error('Erreur lors du chargement des séances :', error);
//       }
//     );
//   }

//   loadUsers() {
//     this.coachesService.getCoaches().subscribe(
//       users => {
//         this.users = users;
//       },
//       error => {
//         console.error('Erreur lors du chargement des coaches :', error);
//       }
//     );
//   }

//   onSubmit() {
//     if (this.reservationForm.valid) {
//       const reservationData = this.reservationForm.value;
//       this.reservationService.createReservation(reservationData).subscribe(
//         response => {
//           console.log('Réservation créée avec succès :', response);
//           console.log('reservationData :', reservationData);
//           // Action après la création réussie
//         },
//         error => {
//           console.error('Erreur lors de la création de la réservation :', error);
//           // Gérer les erreurs ici
//         }
//       );
//     } else {
//       this.reservationForm.markAllAsTouched();
//     }
//   }
// }






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
  users: any[] = [];
  reservationForm: FormGroup;

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

  loadSeances() {
    this.sessionService.getSessions().subscribe(
      seances => {
        this.seances = seances;
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

  // onSubmit() {
  //   if (this.reservationForm.valid) {
  //     const reservationData = this.reservationForm.value;
  //     this.reservationService.createReservation(reservationData).subscribe(
  //       response => {
  //         console.log('Réservation créée avec succès :', response);
  //         console.log('reservationData :', reservationData);
  //         // Action après la création réussie
  //       },
  //       error => {
  //         console.error('Erreur lors de la création de la réservation :', error);
  //         if (error.status === 404) {
  //           console.error('Endpoint not found. Please check the URL.');
  //         } else {
  //           console.error('Error:', error.error);
  //         }
  //         // Gérer les erreurs ici
  //       }
  //     );
  //   } else {
  //     this.reservationForm.markAllAsTouched();
  //   }
  // }

  onSubmit() {
    if (this.reservationForm.valid) {
      const reservationData = this.reservationForm.value;
      this.reservationService.createReservation(reservationData).subscribe(
        response => {
          console.log('Réservation créée avec succès :', response);
          // Action après la création réussie
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
}
