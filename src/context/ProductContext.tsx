import { createContext, useState } from "react";
import { ProviderProps } from "./AuthContext";

export type ProductValue = {
  products: Products;
  setProducts: React.Dispatch<React.SetStateAction<Products>>;
  statProducts: StatProducts;
  setStatProducts: React.Dispatch<React.SetStateAction<StatProducts>>;
};

export type Product = {
  id: number;
  type?: string;
  location?: string;
  devis?: string;
  detail?: string;
  dimension?: string;
  client?: string;
  chantier?: string;
  productTypeId?: number;
  createdAt: string;
  tech?: string;
};

export type StatProducts = {
  year: number;
  count: number;
  month: number;
  productId: number;
}[];

export type Products = Product[];

const ProductContext = createContext<ProductValue | null>(null);

const ProductProvider = ({ children }: ProviderProps) => {
  const [products, setProducts] = useState<Products>([]);
  const [statProducts, setStatProducts] = useState<StatProducts>([]);
  return (
    <ProductContext.Provider
      value={{ products, setProducts, statProducts, setStatProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

export { ProductProvider };