import { Component, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/core/services/sessions.service';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent implements OnInit {
  sessions: any[] = [];
  errorMessage: string | null = null;

  constructor(private sessionsService: SessionsService) { }

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions(): void {
    this.sessionsService.getSessions().subscribe(
      (data) => {
        this.sessions = data;
      },
      (error) => {
        console.error('Error fetching sessions', error);
        this.errorMessage = 'Error fetching sessions';
      }
    );
  }
  reserver(id: string): void {
    this.sessionsService.getSessionById(id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error fetching session', error);
      }
    );
  }

  deleteSession(id: string): void {
    this.sessionsService.deleteSession(id).subscribe(
      () => {
        this.sessions = this.sessions.filter(session => session.id !== id);
      },
      (error) => {
        console.error('Error deleting session', error);
      }
    );
  }
}
