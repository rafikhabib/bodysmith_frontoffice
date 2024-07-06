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
import { DatePipe } from '@angular/common';

import { PanierComponent } from './panier/panier.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditComponent } from './edit/edit.component';
import { CategorieComponent } from './categorie/categorie.component';

import { CategorieService } from './core/services/categorie.service';
import { ProductService } from './core/services/product.service';
import { LoginComponent,  } from './sign-in/sign-in.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { PlatListComponent } from './plat-list/plat-list.component';
import { PlatDetailComponent } from './plat-detail/plat-detail.component';
import { FavoritePlansComponent } from './favorite-plans/favorite-plans.component';
import { SessionsListComponent } from './sessions-list/sessions-list.component';
import { CoachesListComponent } from './coaches-list/coaches-list.component';
import { AuthInterceptor } from './core/interceptors/auth-interceptor.service'; // Importer l'intercepteur
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReservationsComponent } from './reservations/reservations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingDialogComponent } from './shopping-dialog/shopping-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';

import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    ProductsListComponent,
    TndCurrencyPipe,
    PanierComponent,
    LoginComponent,
    AddproductComponent,
    EditComponent,
      SessionsListComponent,
      CoachesListComponent,
      ReservationsComponent,
    RestaurantListComponent,
    RestaurantDetailComponent,
    PlatListComponent,
    PlatDetailComponent,
    FavoritePlansComponent,
    CategorieComponent,
    ShoppingDialogComponent,
    ProfileComponent,
    UpdateProfileComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [CategorieService, ProductService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
