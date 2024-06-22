export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  availableQuantity: number; // Quantité disponible du produit

  categoryName: string;
  imageUrl: string;  
}
