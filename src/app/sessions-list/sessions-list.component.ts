// import { DatePipe } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { SessionsService } from 'src/app/core/services/sessions.service';

// @Component({
//   selector: 'app-sessions-list',
//   templateUrl: './sessions-list.component.html',
//   styleUrls: [ './sessions-list.component.css'
//   //   './../core/css/bootstrap.min.css',
//   //   './../core/css/font-awesome.min.css',
//   //   './../core/css/flaticon.css',
//   //   './../core/css/magnific-popup.css',
//   //   './../core/css/owl.carousel.min.css',
//   //   './../core/css/slicknav.min.css',
//   //   './../core/css/style.css',
//   //   './../core/css/barfiller.css'
//   ]
// })
// export class SessionsListComponent implements OnInit {
//   sessions: any[] = [];
//   errorMessage: string | null = null;
//   schedule: { [time: string]: any[] } = {};

//   constructor(private sessionsService: SessionsService ,  private datePipe: DatePipe) { }

//   // ngOnInit(): void {
//   //   this.getSessions();
//   //   this.buildSchedule();
//   // }

//   ngOnInit() {
//     this.sessionsService.getSessions().subscribe({
//       next: (data) => {
//         this.sessions = data;
//         this.buildSchedule();
//       },
//       error: (err) => {
//         this.errorMessage = 'Erreur lors du chargement des sessions';
//         console.error(err);
//       }
//     });
//   }
//   buildSchedule() {
//     this.schedule = {};
//     this.sessions.forEach(session => {
//       const startTime = this.datePipe.transform(session.HeureDebutEvent, 'shortTime');
//       const endTime = this.datePipe.transform(session.HeureFinEvent, 'shortTime');
//       const timeSlot = `${startTime} - ${endTime}`;
      
//       if (!this.schedule[timeSlot]) {
//         this.schedule[timeSlot] = [];
//       }
//       this.schedule[timeSlot].push(session);
//     });
//   }

//   getSortedTimeSlots(): string[] {
//     return Object.keys(this.schedule).sort();
//   }
  
//   getDays(): string[] {
//     return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//   }
  
//   getSessionForTimeAndDay(time: string, day: string): any {
//     return this.schedule[time].find(session => {
//       const sessionDate = new Date(session.DateEvent);
//       return sessionDate.toLocaleDateString('en-US', { weekday: 'long' }) === day;
//     });
//   }
 
  
//   getSessions(): void {
//     this.sessionsService.getSessions().subscribe(
//       (data) => {
//         this.sessions = data;
//       },
//       (error) => {
//         console.error('Error fetching sessions', error);
//         this.errorMessage = 'Error fetching sessions';
//       }
//     );
//   }
//   reserver(id: string): void {
//     this.sessionsService.getSessionById(id).subscribe(
//       (data) => {
//         console.log(data);
//       },
//       (error) => {
//         console.error('Error fetching session', error);
//       }
//     );
//   }

//   deleteSession(id: string): void {
//     this.sessionsService.deleteSession(id).subscribe(
//       () => {
//         this.sessions = this.sessions.filter(session => session.id !== id);
//       },
//       (error) => {
//         console.error('Error deleting session', error);
//       }
//     );
//   }
// }
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/core/services/sessions.service';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent implements OnInit {
  sessions: any[] = [];
  filteredSessions: any[] = [];
  errorMessage: string | null = null;
  schedule: { [time: string]: any[] } = {};

  constructor(private sessionsService: SessionsService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getSessions();
  }

  getSessions(): void {
    this.sessionsService.getSessions().subscribe({
      next: (data) => {
        this.sessions = data;
        this.filteredSessions = data; // Initially show all sessions
        this.buildSchedule();
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des sessions';
        console.error(err);
      }
    });
  }

  onWeekChange(event: any): void {
    const week = event.target.value; // Format: 'YYYY-Wxx'
    if (week) {
      const [year, weekNumber] = week.split('-W');
      const firstDayOfWeek = this.getFirstDayOfWeek(parseInt(year, 10), parseInt(weekNumber, 10));
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      
      this.filteredSessions = this.sessions.filter(session => {
        const sessionDate = new Date(session.DateEvent);
        return sessionDate >= firstDayOfWeek && sessionDate <= lastDayOfWeek;
      });
      this.buildSchedule();
    }
  }

  getFirstDayOfWeek(year: number, weekNumber: number): Date {
    const januaryFirst = new Date(year, 0, 1);
    const daysOffset = (weekNumber - 1) * 7;
    const firstDayOfWeek = new Date(januaryFirst.getTime());
    firstDayOfWeek.setDate(januaryFirst.getDate() + daysOffset - (januaryFirst.getDay() - 1));
    return firstDayOfWeek;
  }

  buildSchedule() {
    this.schedule = {};
    this.filteredSessions.forEach(session => {
      const startTime = this.datePipe.transform(session.HeureDebutEvent, 'shortTime');
      const endTime = this.datePipe.transform(session.HeureFinEvent, 'shortTime');
      const timeSlot = `${startTime} - ${endTime}`;
      
      if (!this.schedule[timeSlot]) {
        this.schedule[timeSlot] = [];
      }
      this.schedule[timeSlot].push(session);
    });
  }

  getSortedTimeSlots(): string[] {
    return Object.keys(this.schedule).sort();
  }

  getDays(): string[] {
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  getSessionForTimeAndDay(time: string, day: string): any {
    return this.schedule[time].find(session => {
      const sessionDate = new Date(session.DateEvent);
      return sessionDate.toLocaleDateString('en-US', { weekday: 'long' }) === day;
    });
  }
}
