// type de produit
export type Product = {
  id: string;
  title: string;
  handle: string;
  image: string;
  variantId: string;
};

//type de données d'adresse
export type AddressData = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone: string;
};
