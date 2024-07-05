import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categories : any = [];
  isPopupOpen = false;
  categoryName = '';
  popupTitle = 'Add New Category';
  popupAction = 'Save';
  currentIndex: number | null = null;
  currentCategorie: any | null = null;


  constructor(
    private categorieService: CategorieService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.fetchCategories()
  }

  fetchCategories(){
    this.categorieService.getAllCategories().subscribe(
      data=> this.categories = data
    )
  }

  openAddPopup() {
    this.isPopupOpen = true;
    this.categoryName = '';
    this.popupTitle = 'Add New Category';
    this.popupAction = 'Save';
    this.currentIndex = null;
  }

  openEditPopup(category: any, index: number) {
    this.isPopupOpen = true;
    this.categoryName = category.name;
    this.popupTitle = 'Edit Category';
    this.popupAction = 'Update';
    this.currentIndex = index;
    this.currentCategorie = category
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  saveCategory(nom : string) {
    if(this.currentCategorie != null){
      this.categorieService.updateCategory(this.currentCategorie._id,nom).subscribe(
        data=>{
          this.closePopup();
          this.currentCategorie = null;
          this.fetchCategories();
        }
      )
    }else{
      this.categorieService.addCategory(nom).subscribe(
        data=>{
          this.closePopup();
          this.currentCategorie = null;
          this.fetchCategories();
        }
      )
    }
  }

  deleteCategory(category: any) {
    this.categorieService.deleteCategory(category._id).subscribe(
      data=>{
        this.fetchCategories();
      },
      error=>Swal.fire({
        title: 'Unable to Delete',
        text: 'This categorie is assigned to products and cannot be deleted',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    )
  }
}
