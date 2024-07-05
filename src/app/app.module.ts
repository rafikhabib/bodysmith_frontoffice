import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductsListComponent } from './product/products-list/products-list.component';
import { TndCurrencyPipe } from './product/tnd-currency.pipe';

import { PanierComponent } from './panier/panier.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditComponent } from './edit/edit.component';
import { CategorieComponent } from './categorie/categorie.component';

import { CategorieService } from './core/services/categorie.service';
import { ProductService } from './core/services/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingDialogComponent } from './shopping-dialog/shopping-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    ProductsListComponent,
    TndCurrencyPipe,
    PanierComponent,
    AddproductComponent,
    EditComponent,
    CategorieComponent,
    ShoppingDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    CategorieService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
