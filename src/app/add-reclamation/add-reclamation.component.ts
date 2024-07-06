import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AddReclamationService } from "../core/services/add-reclamation.service";

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit {
  services: any[] = []; // Assuming services or typeReclamation will be fetched here

  constructor(private addReclamationService: AddReclamationService) {}
    reclamation:FormGroup  = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      numTelReclamation: new FormControl(0, [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
      serviceId: new FormControl('', [Validators.required]), // Assuming this will hold the selected service's _id
    });


  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices(): void {
    this.addReclamationService.getData() // Assuming this method fetches services or typeReclamation
      .subscribe(
        (data) => {
          this.services = data;
        },
        (error) => {
          console.error('Error fetching services:', error);
        }
      );
  }

  add(): void {
    if (this.reclamation.valid) {
      console.log(this.reclamation.value);
      this.addReclamationService.addReclamation(this.reclamation.value).subscribe({
        next: () => {
          alert('Ajouté avec succès');
          this.reclamation.reset(); // Reset the form after successful submission
        },
        error: (error) => {
          console.error('Error adding reclamation:', error);
        }
      });
    }
  }
}
