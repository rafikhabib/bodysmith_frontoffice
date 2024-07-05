import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shopping-dialog',
  templateUrl: './shopping-dialog.component.html',
  styleUrls: ['./shopping-dialog.component.css']
})
export class ShoppingDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
