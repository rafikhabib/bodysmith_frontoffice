import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = 'http://localhost:3000/';
  private apiUrlProduct: string = this.baseUrl + 'product/';
  private product: Product | null = null;

  constructor(private http: HttpClient) {}

  getProducts(params?: any): Observable<Product[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.append(key, params[key]);
      });
    }
    return this.http.get<Product[]>(this.apiUrlProduct, { params: httpParams });
  }
  
  addProduct(productData: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrlProduct, productData);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrlProduct}${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlProduct}${id}`);
  }

  getTopSellingProductInPeriod(startDate: string, endDate: string): Observable<Product> {
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    return this.http.get<Product>(`${this.baseUrl}top-selling-product/`, { params });
  }
  
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrlProduct}/categories`);
  }

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // Adjust headers as needed
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    return this.http.post<any>(`${this.baseUrl}upload-image`, formData, { headers });
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrlProduct}/${id}`);
  }
  addCategory(newCategory: string): Observable<any> {
    const categoryData = { categoryName: newCategory };
    return this.http.post<any>(`${this.apiUrlProduct}/categories`, categoryData);
  }
 
}
