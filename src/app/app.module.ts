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

import { CategorieService } from './core/services/categorie.service';
import { ProductService } from './core/services/product.service';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { PlatListComponent } from './plat-list/plat-list.component';
import { PlatDetailComponent } from './plat-detail/plat-detail.component';
import { FavoritePlansComponent } from './favorite-plans/favorite-plans.component';

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

    RestaurantListComponent,
    RestaurantDetailComponent,
    PlatListComponent,
    PlatDetailComponent,
    FavoritePlansComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [CategorieService, ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
