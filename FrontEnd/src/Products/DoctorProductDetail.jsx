import React from "react";
import ProductDetail from "./ProductDetail";

export default function DoctorProductDetail() {
  return (
    <ProductDetail
      priceField="priceWholesale"  //showing wholesaleprice
      backTo="/doctor/products"     
    />
  );
}
