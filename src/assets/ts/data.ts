export type BigCharDatas = {
  name: string;
  suivis?: number;
  number: number;
}[]

export type SingleDatas = {
  name: string;
  total_suivis?: number;
  number: number;
  suivis_produits?: number;
}[]

export const dataHome: BigCharDatas = [
  { name: "Jan", suivis: 0, number: 1 },
  { name: "Feb", suivis: 0, number: 2 },
  { name: "Mar", suivis: 0, number: 3 },
  { name: "Apr", suivis: 0, number: 4 },
  { name: "May", suivis: 0, number: 5 },
  { name: "Jun", suivis: 0, number: 6 },
  { name: "Jul", suivis: 0, number: 7 },
  { name: "Aug", suivis: 0, number: 8 },
  { name: "Sep", suivis: 0, number: 9 },
  { name: "Oct", suivis: 0, number: 10 },
  { name: "Nov", suivis: 0, number: 11 },
  { name: "Dec", suivis: 0, number: 12 },
];

export const dataSingles:SingleDatas = [
  { name: "Jan", total_suivis: 0, number: 1, suivis_produits: 0 },
  { name: "Feb", total_suivis: 0, number: 2, suivis_produits: 0 },
  { name: "Mar", total_suivis: 0, number: 3, suivis_produits: 0 },
  { name: "Apr", total_suivis: 0, number: 4, suivis_produits: 0 },
  { name: "May", total_suivis: 0, number: 5, suivis_produits: 0 },
  { name: "Jun", total_suivis: 0, number: 6, suivis_produits: 0 },
  { name: "Jul", total_suivis: 0, number: 7, suivis_produits: 0 },
  { name: "Aug", total_suivis: 0, number: 8, suivis_produits: 0 },
  { name: "Sep", total_suivis: 0, number: 9, suivis_produits: 0 },
  { name: "Oct", total_suivis: 0, number: 10, suivis_produits: 0 },
  { name: "Nov", total_suivis: 0, number: 11, suivis_produits: 0 },
  { name: "Dec", total_suivis: 0, number: 12, suivis_produits: 0 },
];