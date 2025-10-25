import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";
import "./Products.css";
import ProductsGrid from "./ProductsGrid";

const CATEGORIES = [
  { id: "pharmaceutical", label: "Pharmaceutical" },
  { id: "solution", label: "Solution" },
  { id: "consumer", label: "Consumer" },
  { id: "surgical", label: "Surgical" },
  { id: "injection", label: "Injection" },
  { id: "syrup", label: "Syrup" },
  { id: "refrigerated", label: "Refrigerated" },
  { id: "cream", label: "Cream" },
  { id: "ointment", label: "Ointment" },
  { id: "inhaler", label: "Inhaler" },
  { id: "powder", label: "Powder" },
];

export default function DoctorProducts() {
  //same as customer sidebar
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [openGroupIds] = useState(new Set());
  const [sort, setSort] = useState("asc");
  const [typeFilter, setTypeFilter] = useState("all");

  return (
    <section className="products-layout">
      <aside className="mc-sidebar">
        <Sidebar
          categories={CATEGORIES}
          selectedCategoryId={selectedCategoryId}
          openGroupIds={openGroupIds}
          sort={sort}
          typeFilter={typeFilter}
          onSelectCategory={setSelectedCategoryId}
          onToggleGroup={() => {}}
          onChangeSort={setSort}
          onChangeType={setTypeFilter}
        />
      </aside>

      <div className="products-content">
        <h2>Our Products</h2>
        <ProductsGrid         
          selectedCategoryId={selectedCategoryId}
          sort={sort}
          typeFilter={typeFilter}
          priceField="priceWholesale"  //showing wholesaleprice
          basePath="/doctor/products" // view button go to doctor routes
        />
      </div>
    </section>
  );
}
