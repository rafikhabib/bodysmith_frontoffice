// notification.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {NotificationService} from "../core/services/notificaion.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notifications: any[] = [];
  private pollingSubscription: Subscription | undefined;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    // Polling every 10 seconds to check for new closed reclamations
    this.pollingSubscription = interval(20000)
      .pipe(
        switchMap(() => this.notificationService.getClosedReclamations())
      )
      .subscribe(
        (reclamations) => {
          if (reclamations.length > 0) {
            this.notifications.push({
              message: 'Your reclamation has been treated.',
              timestamp: new Date()
            });
          }
        },
        (error) => {
          console.error('Error fetching closed reclamations:', error);
        }
      );
  }

  ngOnDestroy(): void {
    // Unsubscribe from the polling subscription to avoid memory leaks
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

}
