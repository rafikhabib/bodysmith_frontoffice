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
      EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [], // Vous pouvez ajouter des services ici
  bootstrap: [AppComponent]
})
export class AppModule { }
